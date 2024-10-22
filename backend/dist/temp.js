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
const url = "https://sqs.ap-south-1.amazonaws.com/459445447539/myqueue.fifo";
var params = {
    MessageBody: "This is the body for this",
    MessageDeduplicationId: "TheWhistler" + Math.random().toString(),
    MessageGroupId: "Group1",
    QueueUrl: url,
};
// sqs.listQueues(params, function (err, data) {
//     if (err) {
//         console.log("Error", err);
//     } else {
//         console.log("Success", data.QueueUrls);
//     }
// });
sqs.sendMessage(params, function (err, data) {
    if (err) {
        console.log("Error", err);
    }
    else {
        console.log("Success", data.MessageId);
    }
});
