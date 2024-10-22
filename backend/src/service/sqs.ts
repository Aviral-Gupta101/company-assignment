import "dotenv/config"
import AWS from "aws-sdk";
import { postModel } from "../models/postModel";
import { pushSseEventMany } from "../lib/sse";

AWS.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.ACCESS_SECRET,
    region: "ap-south-1"
});
var sqs = new AWS.SQS({ apiVersion: "2012-11-05" });


export function listQueues() {

    sqs.listQueues({}, function (err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Success", data.QueueUrls);
        }
    });
}

export function sendSqsMessage(id: string) {

    const url = process.env.SQS_URL;

    if (!url)
        throw Error("SQS url not defined");

    const params: AWS.SQS.SendMessageRequest = {

        MessageBody:
            id,
        MessageDeduplicationId: id,
        MessageGroupId: "Group1",
        QueueUrl: url,
    };


    sqs.sendMessage(params, function (err, data) {
        if (err) {
            console.log("SQS MSG SENT ERROR", err);
        } else {
            console.log("SQS MSG SENT", data.MessageId);
        }
    }
    );
}

export function receiveSqsMessage() {

    const url = process.env.SQS_URL;

    if (!url)
        throw Error("SQS url not defined");

    var params: AWS.SQS.ReceiveMessageRequest = {
        MaxNumberOfMessages: 10,
        MessageAttributeNames: ["All"],
        QueueUrl: url,
        VisibilityTimeout: 20,
        WaitTimeSeconds: 0,
    };

    sqs.receiveMessage(params, async (err, data) => {
        if (err) {
            console.log("Receive Error", err);
        } else if (data.Messages) {
            console.log("Data: ", data);

            const msgList = data.Messages;

            msgList.forEach(async (msg) => {

                try {

                    const timeStamp = Date.now();
                    const res = await postModel.findOneAndUpdate({ _id: msg.Body }, { finalTimeStamp: timeStamp, status: "completed" });
                    
                    if(res){
                        pushSseEventMany({
                            status: "completed", id: res._id.toString(), finalTimeStamp: timeStamp
                        }, "update");
                    }
                    console.log(res);

                    console.log("Modifying the queust");

                    var deleteParams: AWS.SQS.DeleteMessageRequest = {
                        QueueUrl: url,
                        ReceiptHandle: msg.ReceiptHandle as string,
                    };
                    sqs.deleteMessage(deleteParams, function (err, data) {
                        if (err) {
                            console.log("Delete Error", err);
                        } else {
                            console.log("Message Deleted", data);
                        }
                    });
                } catch (error) {
                    console.log("Invalid message type received");
                    
                }

            })
        }
    });
}







receiveSqsMessage()