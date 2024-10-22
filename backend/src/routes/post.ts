import express, { Request, Response } from "express";
import {z} from "zod";
import { postModel } from "../models/postModel";
import { sendSqsMessage } from "../service/sqs";
import { pushSseEventMany } from "../lib/sse";
const postRouter = express.Router();

const postSchema = z.object({
    title: z.string().min(3),
    description: z.string().min(3),

}).strict();

postRouter.get("/", async (req: Request, res: Response) => {

    console.log("Frontend request is herer");
    
    try {

        const posts = await postModel.find({});

        res.json({posts: posts})

    } catch (error) {
        
        res.status(500).json({message: "Something went wrong"});
    }

});

postRouter.post("/create", async (req: Request, res: Response) => {
    
    const {success, data, error} = postSchema.safeParse(req.body);

    if(!success){
        console.log("here abve");
        
        res.status(400).json({error: error.issues});
        console.log("here below");
        return;
    }

    try {

        const post = await postModel.create({
            title: data.title,
            description: data.description
        });

        sendSqsMessage(post._id.toString());
        pushSseEventMany(post, "new-data");

        res.json({message: "post created", postId: post._id})

    } catch (error) {
        
        res.status(500).json({message: "Something went wrong"});
    }

});

postRouter.get("/check/:id", async (req: Request, res: Response) => {
    
    const id = req.params.id;

    if(!id){

        res.status(400).json({message: "ID required for posts"});
        return;
    }

    try {

        const foundpost = await postModel.findById(id);

        if(!foundpost){

            res.status(404).json({message: "post not found"});
            return;
        }

        res.json({post: foundpost})

    } catch (error) {
        
        res.status(500).json({message: "Something went wrong"});
    }

});


export default postRouter;