import express, { Request, Response } from "express";
import { createSession, DefaultSessionState } from "better-sse";
import { v4 } from "uuid";
import { addSseSession, removeSseSession } from "../lib/sse";

const sseRouter = express.Router();

sseRouter.get("/", async (req: Request, res: Response) => {

    console.log("Client connected !!!");
    
    const sessionId = v4();
	const session = await createSession(req, res);

    addSseSession(sessionId, session);

    session.on("disconnected", () => {
        console.log("Client disconnected");
        
        removeSseSession(sessionId);
    });
});

export default sseRouter;