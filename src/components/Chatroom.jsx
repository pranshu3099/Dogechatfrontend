import Doge from "../icons/Doge.jpg";
import sendbutton from "../icons/send-alt-1-svgrepo-com.svg";
import { Textarea } from "@chakra-ui/react";
import { useState } from "react";
const Chatroom = ({ sendMessage, recievedmessage }) => {
  const [messsage, setMessage] = useState("");

  const handleMessage = (message) => {
    const textInput = document.querySelector(".chat-input");
    setMessage(message);
  };

  const handleSendMessage = () => {
    if (messsage === "" || checkForSpaces()) return;
    else {
      console.log(messsage);
      // sendMessage(messsage);
      setMessage("");
    }
  };

  function checkForSpaces() {
    let trimmedText = messsage;
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
            <div>
              <p className="user-message">
                You can achieve this by using the justify-content property on
                the container with a value of space-between. This will
                distribute the child elements along the main axis, pushing one
                to the left end and the other to the right end. Here's an
                example: css ?
              </p>
              <p className="doge-message">Hi, i'm fime</p>
              <p className="user-message">
                achieve this by using the justify-content property on the
                container with a value of space-between. This will distribute
                the child elements along the main axis, pushing one to the left
                end and the other to the right end. Here's an example: css ?
              </p>
              <p className="doge-message">Hi, i'm fime</p>
              <p className="user-message">
                achieve this by using the justify-content property on the
                container with a value of space-between. This will distribute
                the child elements along the main axis, pushing one to the left
                end and the other to the right end. Here's an example: css ?
              </p>
              <p className="doge-message">Hi, i'm fime</p>
              <p className="user-message">
                achieve this by using the justify-content property on the
                container with a value of space-between. This will distribute
                the child elements along the main axis, pushing one to the left
                end and the other to the right end. Here's an example: css ?
              </p>
              <p className="doge-message">Hi, i'm fime</p>
              <p className="user-message">
                achieve this by using the justify-content property on the
                container with a value of space-between. This will distribute
                the child elements along the main axis, pushing one to the left
                end and the other to the right end. Here's an example: css ?
              </p>
              <p className="doge-message">Hi, i'm fime</p>
            </div>
          </div>
        </div>
        <div className="chatroom-inputbox">
          <Textarea
            placeholder="yomr memessage"
            className="chat-input"
            value={messsage}
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

export default Chatroom;
