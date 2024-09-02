import React, {useEffect, useRef} from "react";
import Image from "next/image";
import {ISocketReceivedMessage} from "@lib/definitions";

export default function LeftBubble(message: ISocketReceivedMessage) {
  return (
    <div key={message.message_id} className="chat chat-start animate-fadeInUp">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <Image
            alt={message.user_name}
            src={message.user_image}
            height={128}
            width={128}
          />
        </div>
      </div>
      <div className="chat-header">
        {message.user_name}
      </div>
      <div className="chat-bubble bg-neutral">{message.message}</div>
    </div>
  );
}