import React from "react";

export type User = {
  name: string;
  email: string;
  image: string;
};

export type SocketProviderProps = {
  children?: React.ReactNode;
}

export type ISocketSentMessage = {
  msg: string,
  user_email: string
}

export type ISocketReceivedMessage = {
  message: string,
  message_id: string,
  user_email: string,
  user_name: string,
  user_image: string
}

export type ISocketContext = {
  sendMessage: (msg: ISocketSentMessage) => void;
  messages: ISocketReceivedMessage[];
}
