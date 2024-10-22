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
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const postModel_1 = require("../models/postModel");
const sqs_1 = require("../service/sqs");
const sse_1 = require("../lib/sse");
const postRouter = express_1.default.Router();
const postSchema = zod_1.z.object({
    title: zod_1.z.string().min(3),
    description: zod_1.z.string().min(3),
}).strict();
postRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Frontend request is herer");
    try {
        const posts = yield postModel_1.postModel.find({});
        res.json({ posts: posts });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}));
postRouter.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { success, data, error } = postSchema.safeParse(req.body);
    if (!success) {
        console.log("here abve");
        res.status(400).json({ error: error.issues });
        console.log("here below");
        return;
    }
    try {
        const post = yield postModel_1.postModel.create({
            title: data.title,
            description: data.description
        });
        (0, sqs_1.sendSqsMessage)(post._id.toString());
        (0, sse_1.pushSseEventMany)(post, "new-data");
        res.json({ message: "post created", postId: post._id });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}));
postRouter.get("/check/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!id) {
        res.status(400).json({ message: "ID required for posts" });
        return;
    }
    try {
        const foundpost = yield postModel_1.postModel.findById(id);
        if (!foundpost) {
            res.status(404).json({ message: "post not found" });
            return;
        }
        res.json({ post: foundpost });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}));
exports.default = postRouter;
