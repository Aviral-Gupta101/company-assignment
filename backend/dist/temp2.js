"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
// Load the AWS SDK for Node.js
const aws_sdk_1 = __importDefault(require("aws-sdk"));
// Set the region
aws_sdk_1.default.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.ACCESS_SECRET,
    region: "ap-south-1"
});
var sqs = new aws_sdk_1.default.SQS({ apiVersion: "2012-11-05" });
const queueURL = "https://sqs.ap-south-1.amazonaws.com/459445447539/myqueue.fifo";
var params = {
    AttributeNames: ["SentTimestamp"],
    MaxNumberOfMessages: 10,
    MessageAttributeNames: ["All"],
    QueueUrl: queueURL,
    VisibilityTimeout: 20,
    WaitTimeSeconds: 0,
};
sqs.receiveMessage(params, function (err, data) {
    if (err) {
        console.log("Receive Error", err);
    }
    else if (data.Messages) {
        console.log("Data: ", data);
        if (data.Messages.length > 0 && data.Messages[0].ReceiptHandle) {
            var deleteParams = {
                QueueUrl: queueURL,
                ReceiptHandle: data.Messages[0].ReceiptHandle,
            };
            sqs.deleteMessage(deleteParams, function (err, data) {
                if (err) {
                    console.log("Delete Error", err);
                }
                else {
                    console.log("Message Deleted", data);
                }
            });
        }
        else {
            console.log("Its undefined !!!");
        }
    }
});
