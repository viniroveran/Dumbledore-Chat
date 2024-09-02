import {Server} from "socket.io";
import {redisPub, redisSub} from "./redis";
import {getUserByEmail} from "./user";
import {createMessage} from "./messages";

class SocketService {
  private _io: Server;

  constructor() {
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

    io.on("connect", (socket) => {
      console.log(`New socket connected: `, socket.id);
      socket.on("event:message", async ({message, user_email}: { message: string, user_email: string }) => {
        const message_id = crypto.randomUUID();
        await getUserByEmail(user_email).then(async (user) => {
          if (user)
            await redisPub.publish("MESSAGES", JSON.stringify({
              message: message,
              message_id: message_id,
              user_id: user.id,
              user_email: user_email,
              user_name: user.name,
              user_image: user.avatar
            }));
        });
      });
    });

    redisSub.on("message", async (channel, message) => {
      if (channel === "MESSAGES") {
        io.emit("message", message);
        const msg = JSON.parse(message)
        await createMessage(msg.message_id, msg.message, msg.user_id);
      }
    });
  }

  get io() {
    return this._io;
  }
}

export default SocketService;
