import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { io } from "socket.io-client";
import DogeList from "./DogeList";
import Chatroom from "./Chatroom";
import { useLocation } from "react-router-dom";
export const Chat = () => {
  const [messagearr, setMessagesarr] = useState([]);
  const [getChats, setGetchats] = useState([]);
  const [open, setOpen] = useState(false);
  const socket = io(import.meta.env.VITE_REACT_APP_API_URL, {
    path: "/socket.io",
  });
  const location = useLocation();
  let profilepicture = location?.state?.user?.profile_picture;
  const addToLocalStorage = (new_message) => {
    let chats = JSON.parse(localStorage.getItem("chats"));
    if (chats) {
      chats = [...chats, new_message];
      localStorage.setItem("chats", JSON.stringify(chats));
    } else {
      let chats = [];
      chats.push(new_message);
      localStorage.setItem("chats", JSON.stringify(chats));
    }
  };

  useEffect(() => {
    socket.on("chat message", (msg, type = null) => {
      let doge_new_message = { message: msg, role: "doge" };
      if (type === "doge") {
        setMessagesarr((prev) => {
          return [...prev, doge_new_message];
        });
        addToLocalStorage(doge_new_message);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [messagearr]);

  useEffect(() => {
    let chats = JSON.parse(localStorage.getItem("chats"));
    if (chats) {
      setGetchats(chats);
    }
  }, []);

  const sendMessage = (message) => {
    socket.emit("chat message", message, "user");
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className="chat-main-container">
      <DogeList handleOpen={handleOpen} profilepicture={profilepicture} />
      <Chatroom
        sendMessage={sendMessage}
        setMessagesarr={setMessagesarr}
        messagearr={messagearr}
        addToLocalStorage={addToLocalStorage}
        getChats={getChats}
        open={open}
      />
    </div>
  );
};

export default Chat;
