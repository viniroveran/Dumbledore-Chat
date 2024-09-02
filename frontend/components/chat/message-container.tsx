"use client";

import React, {useEffect, useRef} from "react";
import Image from "next/image";
import {User} from "@lib/definitions";
import {ISocketReceivedMessage, useSocket} from "@context/socket-context";

export default function MessageContainer(user: User) {
  // Send message
  const {messages} = useSocket();

  // Scroll to bottom
  const listRef = useRef<any>(null);
  useEffect(() => {
    listRef.current?.lastElementChild?.scrollIntoView();
  }, [messages]);

  return (
    <div className="bg-base-200 flex-1 p-4 overflow-y-auto">
      <div className="flex flex-col space-y-2">
        {messages.map((message: ISocketReceivedMessage) => {
            return message.user_email == user.email ? (
              <div key={message.message_id} ref={listRef} className="chat chat-end">
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
            ) : (
              <div key={message.message_id} ref={listRef} className="chat chat-start">
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
            )
          }
        )}
      </div>
    </div>
  );
}