"use client";

import React, {useCallback, useContext, useEffect, useState} from "react";
import {io, Socket} from "socket.io-client";

export interface SocketProviderProps {
  children?: React.ReactNode;
}

export interface ISocketSentMessage {
  msg: string,
  user_email: string,
  user_name: string,
  user_image: string
}

export interface ISocketReceivedMessage {
  message: string,
  message_id: string,
  user_email: string,
  user_name: string,
  user_image: string
}

export interface ISocketContext {
  sendMessage: (message: string, user_email: string, user_name: string, user_image: string) => void;
  messages: ISocketReceivedMessage[];
}

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
    (message, user_email, user_name, user_image) => {
      if (!socket) throw new Error(`Socket is undefined`);
      socket.emit("event:message", {message: message, user_email: user_email, user_name: user_name, user_image: user_image});
    },
    [socket]
  );

  const onMessageReceived = useCallback((msg: string) => {
    const message: ISocketReceivedMessage = JSON.parse(msg) as {message: string, message_id: string, user_email: string, user_name: string, user_image: string };

    setMessages((prev) => [...prev, message]);
  }, []);

  useEffect(() => {
    const _socket = io("http://localhost:8000");
    _socket.on("message", onMessageReceived);

    setSocket(_socket);

    return () => {
      _socket.off("message", onMessageReceived);
      _socket.disconnect();
      setSocket(undefined);
    };
  }, []);

  return (
    <SocketContext.Provider value={{sendMessage, messages}}>
      {children}
    </SocketContext.Provider>
  );
};