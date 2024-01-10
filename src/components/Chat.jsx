import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { io } from "socket.io-client";
import DogeList from "./DogeList";
import Chatroom from "./Chatroom";
import { useLocation } from "react-router-dom";
export const Chat = () => {
  const [messagearr, setMessagesarr] = useState([]);
  const socket = io("http://localhost:3000", { path: "/socket.io" });
  const location = useLocation();
  // console.log(location);
  // let profilepicture = location?.state?.data?.url[0].path;
  useEffect(() => {
    socket.on("chat message", (msg, type = null) => {
      console.log(type);
      console.log("Recieved message", msg);
      if (type === "doge") {
        setMessagesarr((prev) => {
          return [...prev, { message: msg, role: "doge" }];
        });
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = (message) => {
    socket.emit("chat message", message, "user");
  };

  return (
    <div className="chat-main-container">
      <DogeList />
      <Chatroom
        sendMessage={sendMessage}
        setMessagesarr={setMessagesarr}
        messagearr={messagearr}
      />
    </div>
  );
};

export default Chat;
