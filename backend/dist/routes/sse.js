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
const better_sse_1 = require("better-sse");
const uuid_1 = require("uuid");
const sse_1 = require("../lib/sse");
const sseRouter = express_1.default.Router();
sseRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Client connected !!!");
    const sessionId = (0, uuid_1.v4)();
    const session = yield (0, better_sse_1.createSession)(req, res);
    (0, sse_1.addSseSession)(sessionId, session);
    session.on("disconnected", () => {
        console.log("Client disconnected");
        (0, sse_1.removeSseSession)(sessionId);
    });
}));
exports.default = sseRouter;
