"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const cronjob_1 = require("./cronjob");
function startServer(app, port) {
    const MONGO_URL = process.env.MONGO_URL;
    if (!MONGO_URL)
        throw Error("MONGO_URL is not defined");
    mongoose_1.default.connect(MONGO_URL);
    mongoose_1.default.connection.once("connected", () => {
        console.log("DB connected. ");
        (0, cronjob_1.startSqsCronJob)();
        app.listen(port, () => {
            console.log(`Server started on http://localhost:${port}`);
        });
    });
}
exports.startServer = startServer;
