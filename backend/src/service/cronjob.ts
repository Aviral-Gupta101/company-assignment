import cron from "node-cron"
import { receiveSqsMessage } from "./sqs";


export function startSqsCronJob() {

    console.log("Cron Job started ...");

    cron.schedule('* * * * *', () => {
        receiveSqsMessage();
    });

}