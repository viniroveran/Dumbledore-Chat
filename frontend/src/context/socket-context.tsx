"use client";

import React, {useCallback, useContext, useEffect, useState} from "react";
import {io, Socket} from "socket.io-client";
import {ISocketContext, ISocketReceivedMessage, ISocketSentMessage, SocketProviderProps} from "@lib/definitions";

const SocketContext = React.createContext<ISocketContext | null>(null);

export const useSocket = () => {
  const state = useContext(SocketContext);
  if (!state) throw new Error(`Socket state is undefined`);

  return state;
};

export const SocketProvider: React.FC<SocketProviderProps> = ({children}) => {
  const [socket, setSocket] = useState<Socket>();
  const [messages, setMessages] = useState<ISocketReceivedMessage[]>([]);

  const sendMessage: ISocketContext["sendMessage"] = useCallback(
    (msg: ISocketSentMessage) => {
      if (!socket) throw new Error(`Socket is undefined`);
      socket.emit("event:message", {message: msg.msg, user_email: msg.user_email});
    },
    [socket]
  );

  const onMessageReceived = useCallback((msg: string) => {
    const message: ISocketReceivedMessage = JSON.parse(msg) as {
      message: string,
      message_id: string,
      user_email: string,
      user_name: string,
      user_image: string
    };

    setMessages((prev) => [...prev, message]);
  }, []);

  useEffect(() => {
    const _socket = io(process.env.NEXT_PUBLIC_BACKEND_URL);
    _socket.on("message", onMessageReceived);

    setSocket(_socket);

    // TODO: get messages from backend
    const previousMessages: ISocketReceivedMessage[] = [
      {
        message: "Oi, eu sou um gatinho!",
        message_id: "001",
        user_email: "gatinho@google.com",
        user_name: "Gatinho",
        user_image: "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg"
      }
    ]
    setMessages(previousMessages)

    return () => {
      _socket.off("message", onMessageReceived);
      _socket.disconnect();
      setSocket(undefined);
    };
  }, [onMessageReceived]);

  return (
    <SocketContext.Provider value={{sendMessage, messages}}>
      {children}
    </SocketContext.Provider>
  );
};