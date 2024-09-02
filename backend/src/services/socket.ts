import { Server } from "socket.io";
import {Redis} from "ioredis";
import prismaClient from "./prisma";
import {redisPub, redisSub} from "./redis";

class SocketService {
  private _io: Server;

  constructor() {
    console.log("Init Socket Service...");
    this._io = new Server({
      cors: {
        allowedHeaders: ["*"],
        origin: "*",
      },
    });
    redisSub.subscribe("MESSAGES");
  }

  public initListeners() {
    const io = this.io;
    console.log("Init Socket Listeners...");

    io.on("connect", (socket) => {
      console.log(`New Socket Connected`, socket.id);
      socket.on("event:message", async ({ message, user_email, user_name, user_image }: { message: string, user_email: string, user_name: string, user_image: string }) => {
        const message_id = crypto.randomUUID();
        console.log("Message received (content): ", message);
        console.log("Message received (user_email): ", user_email);
        console.log("Message received (user_name): ", user_name);
        console.log("Message received (user_image): ", user_image);
        // publish this message to redis
        await redisPub.publish("MESSAGES", JSON.stringify({ message, message_id, user_email, user_name, user_image }));
      });
    });

    redisSub.on("message", async (channel, message) => {
      if (channel === "MESSAGES") {
        console.log("new message from redis", message);
        io.emit("message", message);
        try {
          await prismaClient.message.create({
            data: {
              text: message.toString(),
            },
          });
        } catch (err) {
          console.log("Something is wrong");
        }
      }
    });
  }

  get io() {
    return this._io;
  }
}

export default SocketService;
