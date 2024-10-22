"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    initialTimestamp: {
        type: Number,
        default: Date.now()
    },
    finalTimeStamp: {
        type: Number,
        default: null
    },
    status: {
        type: String,
        enum: ["Processing", "Failed", "completed"],
        default: "Processing"
    }
});
exports.postModel = mongoose_1.default.model('post', postSchema);
