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
const socket_io_1 = require("socket.io");
const ioredis_1 = __importDefault(require("ioredis"));
const prisma_1 = __importDefault(require("./prisma"));
console.log(process.env);
const redis = new ioredis_1.default(process.env.REDIS_URL);
class SocketService {
    constructor() {
        console.log("Init Socket Service...");
        this._io = new socket_io_1.Server({
            cors: {
                allowedHeaders: ["*"],
                origin: "*",
            },
        });
        redis.subscribe("MESSAGES");
    }
    initListeners() {
        const io = this.io;
        console.log("Init Socket Listeners...");
        io.on("connect", (socket) => {
            console.log(`New Socket Connected`, socket.id);
            const message_id = crypto.randomUUID();
            socket.on("event:message", (_a) => __awaiter(this, [_a], void 0, function* ({ message, user_email, user_name }) {
                console.log("Message received (content): ", message);
                console.log("Message received (user_email): ", user_email);
                console.log("Message received (user_name): ", user_name);
                // publish this message to redis
                yield redis.publish("MESSAGES", JSON.stringify({ message, user_email, user_name }));
            }));
        });
        redis.on("message", (channel, message) => __awaiter(this, void 0, void 0, function* () {
            if (channel === "MESSAGES") {
                console.log("new message from redis", message);
                io.emit("message", message);
                try {
                    yield prisma_1.default.message.create({
                        data: {
                            text: message.toString(),
                        },
                    });
                }
                catch (err) {
                    console.log("Something is wrong");
                }
            }
        }));
    }
    get io() {
        return this._io;
    }
}
exports.default = SocketService;
