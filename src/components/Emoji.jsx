import { Data } from "emoji-mart";
import EmojiPicker from "@emoji-mart/react";
const Emoji = ({ handleMessage }) => {
  const handleEmoji = (e) => {
    let emoji_arr = [];
    return function (e) {
      emoji_arr.push(e.native);
      handleMessage(emoji_arr);
    };
  };
  return (
    <>
      <div className="emoji-container">
        <EmojiPicker data={Data} onEmojiSelect={handleEmoji()} />
      </div>
    </>
  );
};

export default Emoji;
