"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const db_1 = require("./service/db");
const post_1 = __importDefault(require("./routes/post"));
const sse_1 = __importDefault(require("./routes/sse"));
const app = (0, express_1.default)();
const PORT = 3000;
// MIDDLEWARES
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// ROUTE
app.use("/post", post_1.default);
app.use("/sse", sse_1.default);
// CONNECT TO DB AND THE START THE EXPRESS SERVER
(0, db_1.startServer)(app, PORT);
