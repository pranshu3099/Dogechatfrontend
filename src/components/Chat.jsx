import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { io } from "socket.io-client";
import DogeList from "./DogeList";
import Chatroom from "./Chatroom";
import { useLocation } from "react-router-dom";
export const Chat = () => {
  const [message, setMessages] = useState("");
  const socket = io("http://localhost:3000", { path: "/socket.io" });
  const location = useLocation();
  // console.log(location);
  // let profilepicture = location?.state?.data?.url[0].path;
  useEffect(() => {
    socket.on("chat message", (msg) => {
      console.log("Recieved message", msg);
      setMessages(msg);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = (message) => {
    socket.emit("chat message", message);
  };

  return (
    <div className="chat-main-container">
      <DogeList />
      <Chatroom sendMessage={sendMessage} recievedmessage={message} />
    </div>
  );
};

export default Chat;
