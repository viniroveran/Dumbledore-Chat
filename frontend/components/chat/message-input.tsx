"use client";

import {useEffect, useState, useCallback} from "react";
import {useSocket} from "@context/socket-context";
import {User} from "@lib/definitions";

export default function MessageInput(user: User) {
  const {sendMessage} = useSocket();
  const [message, setMessage] = useState("");
  const handleSendMessage = useCallback(() => {
    sendMessage(message, user.email, user.name, user.image);
    setMessage("");
  }, [message, sendMessage, user.email, user.image, user.name]);

  useEffect(() => {
    const listener = (event: { code: string; }) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        console.log("Enter key was pressed. Run your function.");
        // event.preventDefault();
        handleSendMessage();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [handleSendMessage]);

  return (
    <div className="bg-base-300 p-4 flex items-center gap-2">
      <input
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        className="flex-1 px-4 py-2 input input-bordered input-primary"
        placeholder="Message..."
      />
      <button className="btn btn-primary focus:outline-none"
              onClick={handleSendMessage}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5}
             stroke="currentColor" className="size-6 fill-base-content">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/>
        </svg>
      </button>
    </div>
  );
}