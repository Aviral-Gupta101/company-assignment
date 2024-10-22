import { Express } from "express";
import mongoose from "mongoose";
import { startSqsCronJob } from "./cronjob";


export function startServer(app: Express, port: number) {
    const MONGO_URL = process.env.MONGO_URL;

    if (!MONGO_URL)
        throw Error("MONGO_URL is not defined");

    mongoose.connect(MONGO_URL);

    mongoose.connection.once("connected", () => {

        console.log("DB connected. ");
        startSqsCronJob();
        
        app.listen(port, () => {

            console.log(`Server started on http://localhost:${port}`);
        });
    });
}

