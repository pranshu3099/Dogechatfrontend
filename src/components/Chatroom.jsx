import Doge from "../icons/Doge.jpg";
import sendbutton from "../icons/send-alt-1-svgrepo-com.svg";
import emoji from "../icons/emoji-smile-svgrepo-com.svg";
import { Textarea } from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import Emoji from "./Emoji";
import React from "react";
const Chatroom = ({
  sendMessage,
  setMessagesarr,
  messagearr,
  addToLocalStorage,
  getChats,
  open,
}) => {
  const [message, setMessage] = useState("");
  const [emojipicker, setEmojipicker] = useState(false);
  const chatContainerRef = useRef();
  useEffect(() => {
    console.log("first");
    const scrollToBottom = () => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight;
      }
    };
    scrollToBottom();

    const handleScroll = () => {
      scrollToBottom();
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [open, message, messagearr]);
  const handleMessage = (message) => {
    if (Array.isArray(message)) {
      let emoji = message.join("");
      setMessage((msg) => {
        return msg + emoji;
      });
    } else {
      setMessage(message);
    }
    if (emojipicker && !Array.isArray(message)) {
      setEmojipicker(false);
    }
  };

  const handleSendMessage = () => {
    if (message === "" || checkForSpaces()) return;
    else {
      let user_new_message = {
        message: message,
        role: "user",
      };
      setMessagesarr((prev) => {
        return [...prev, user_new_message];
      });
      addToLocalStorage(user_new_message);
      sendMessage(message);
      setMessage("");
    }
  };

  function checkForSpaces() {
    let trimmedText = message;
    let pattern = /^\s*$/;
    return pattern.test(trimmedText);
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    } else if (e.key === "Enter" && e.shiftKey) {
      setMessage(message + "\n");
    }
  };

  const handleEmojiPicker = () => {
    emojipicker ? setEmojipicker(false) : setEmojipicker(true);
  };

  return (
    <>
      {open ? (
        <div className="chatroom-container">
          <div className="chatroom-sub-container">
            <div className="chatroom-name">
              <img src={Doge} style={{ width: "50px" }} />
              <p>cheems</p>
            </div>
            <div className="main-chats" ref={chatContainerRef}>
              {<Addelement messagearr={messagearr} getChats={getChats} />}
            </div>
          </div>
          <div className="chatroom-inputbox">
            <Textarea
              placeholder="yomr memessage"
              className="chat-input"
              value={message}
              onChange={(e) => {
                handleMessage(e.target.value);
              }}
              onKeyPress={handleKeyPress}
            ></Textarea>
            {emojipicker ? <Emoji handleMessage={handleMessage} /> : null}

            <img
              src={emoji}
              alt=""
              className="emoji"
              onClick={handleEmojiPicker}
            />

            <img
              src={sendbutton}
              alt=""
              className="send-btn"
              onClick={handleSendMessage}
            />
          </div>
        </div>
      ) : (
        <h1></h1>
      )}
    </>
  );
};

const Addelement = React.memo(({ messagearr, getChats }) => {
  let arr = [];
  if (messagearr.length) {
    messagearr = [...getChats, ...messagearr];
  }
  arr = messagearr?.length ? messagearr : getChats;

  return arr.length
    ? arr.map((msg, index) => {
        return (
          <div className="chats" key={index}>
            <p
              className={msg?.role === "user" ? "user-message" : "doge-message"}
              key={index}
            >
              {msg?.message}
            </p>
          </div>
        );
      })
    : null;
});
export default Chatroom;
