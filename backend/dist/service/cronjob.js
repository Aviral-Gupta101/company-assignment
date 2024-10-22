"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startSqsCronJob = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const sqs_1 = require("./sqs");
function startSqsCronJob() {
    console.log("Cron Job started ...");
    node_cron_1.default.schedule('* * * * *', () => {
        (0, sqs_1.receiveSqsMessage)();
    });
}
exports.startSqsCronJob = startSqsCronJob;
