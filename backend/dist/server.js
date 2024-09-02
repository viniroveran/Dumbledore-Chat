"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const socket_1 = __importDefault(require("./services/socket"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load .env
dotenv_1.default.config();
console.log(process.env.PORT);
const port = process.env.PORT || 8000;
const socketService = new socket_1.default();
const server = require('http').createServer(app_1.default);
server.listen(port, () => console.log(`Server is listening on port ${port}.`));
socketService.io.attach(server);
socketService.initListeners();
