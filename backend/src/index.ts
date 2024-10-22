import express from "express";
import cors from "cors";
import 'dotenv/config'
import { startServer } from "./service/db";
import postRouter from "./routes/post";
import sseRouter from "./routes/sse";

const app = express();
const PORT = 3000;

// MIDDLEWARES
app.use(cors());
app.use(express.json());

// ROUTE
app.use("/post", postRouter)
app.use("/sse", sseRouter);


// CONNECT TO DB AND THE START THE EXPRESS SERVER
startServer(app, PORT);




