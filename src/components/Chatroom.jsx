import Doge from "../icons/Doge.jpg";
import sendbutton from "../icons/send-alt-1-svgrepo-com.svg";
import { Textarea } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import React from "react";
const Chatroom = ({ sendMessage, setMessagesarr, messagearr }) => {
  const [message, setMessage] = useState("");
  const handleMessage = (message) => {
    setMessage(message);
  };

  const handleSendMessage = () => {
    if (message === "" || checkForSpaces()) return;
    else {
      setMessagesarr((prev) => {
        return [...prev, { message: message, role: "user" }];
      });
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
      setMessage(messsage + "\n");
    }
  };

  return (
    <>
      <div className="chatroom-container">
        <div className="chatroom-sub-container">
          <div className="chatroom-name">
            <img src={Doge} style={{ width: "50px" }} />
            <p>cheems</p>
          </div>
          <div className="main-chats">
            {<Addelement messagearr={messagearr} />}
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
          <img
            src={sendbutton}
            alt=""
            className="send-btn"
            onClick={handleSendMessage}
          />
        </div>
      </div>
    </>
  );
};

const Addelement = React.memo(({ messagearr }) => {
  console.log(messagearr);
  return messagearr.length
    ? messagearr.reverse().map((msg, index) => {
        return (
          <div className="chats">
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
