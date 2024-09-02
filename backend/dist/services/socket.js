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
const prisma_1 = __importDefault(require("./prisma"));
const redis_1 = require("./redis");
class SocketService {
    constructor() {
        console.log("Init Socket Service...");
        this._io = new socket_io_1.Server({
            cors: {
                allowedHeaders: ["*"],
                origin: "*",
            },
        });
        redis_1.redisSub.subscribe("MESSAGES");
    }
    initListeners() {
        const io = this.io;
        console.log("Init Socket Listeners...");
        io.on("connect", (socket) => {
            console.log(`New Socket Connected`, socket.id);
            socket.on("event:message", (_a) => __awaiter(this, [_a], void 0, function* ({ message, user_email, user_name, user_image }) {
                const message_id = crypto.randomUUID();
                console.log("Message received (content): ", message);
                console.log("Message received (user_email): ", user_email);
                console.log("Message received (user_name): ", user_name);
                console.log("Message received (user_image): ", user_image);
                // publish this message to redis
                yield redis_1.redisPub.publish("MESSAGES", JSON.stringify({ message, message_id, user_email, user_name, user_image }));
            }));
        });
        redis_1.redisSub.on("message", (channel, message) => __awaiter(this, void 0, void 0, function* () {
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
