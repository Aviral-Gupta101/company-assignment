"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.receiveSqsMessage = exports.sendSqsMessage = exports.listQueues = void 0;
require("dotenv/config");
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const postModel_1 = require("../models/postModel");
const sse_1 = require("../lib/sse");
aws_sdk_1.default.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.ACCESS_SECRET,
    region: "ap-south-1"
});
var sqs = new aws_sdk_1.default.SQS({ apiVersion: "2012-11-05" });
function listQueues() {
    sqs.listQueues({}, function (err, data) {
        if (err) {
            console.log("Error", err);
        }
        else {
            console.log("Success", data.QueueUrls);
        }
    });
}
exports.listQueues = listQueues;
function sendSqsMessage(id) {
    const url = process.env.SQS_URL;
    if (!url)
        throw Error("SQS url not defined");
    const params = {
        MessageBody: id,
        MessageDeduplicationId: id,
        MessageGroupId: "Group1",
        QueueUrl: url,
    };
    sqs.sendMessage(params, function (err, data) {
        if (err) {
            console.log("SQS MSG SENT ERROR", err);
        }
        else {
            console.log("SQS MSG SENT", data.MessageId);
        }
    });
}
exports.sendSqsMessage = sendSqsMessage;
function receiveSqsMessage() {
    const url = process.env.SQS_URL;
    if (!url)
        throw Error("SQS url not defined");
    var params = {
        MaxNumberOfMessages: 10,
        MessageAttributeNames: ["All"],
        QueueUrl: url,
        VisibilityTimeout: 20,
        WaitTimeSeconds: 0,
    };
    sqs.receiveMessage(params, (err, data) => __awaiter(this, void 0, void 0, function* () {
        if (err) {
            console.log("Receive Error", err);
        }
        else if (data.Messages) {
            console.log("Data: ", data);
            const msgList = data.Messages;
            msgList.forEach((msg) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const timeStamp = Date.now();
                    const res = yield postModel_1.postModel.findOneAndUpdate({ _id: msg.Body }, { finalTimeStamp: timeStamp, status: "completed" });
                    if (res) {
                        (0, sse_1.pushSseEventMany)({
                            status: "completed", id: res._id.toString(), finalTimeStamp: timeStamp
                        }, "update");
                    }
                    console.log(res);
                    console.log("Modifying the queust");
                    var deleteParams = {
                        QueueUrl: url,
                        ReceiptHandle: msg.ReceiptHandle,
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
                catch (error) {
                    console.log("Invalid message type received");
                }
            }));
        }
    }));
}
exports.receiveSqsMessage = receiveSqsMessage;
receiveSqsMessage();
