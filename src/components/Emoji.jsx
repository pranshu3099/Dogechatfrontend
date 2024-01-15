import EmojiPicker from "emoji-picker-react";

const Emoji = ({ handleMessage }) => {
  const handleEmoji = (e, emojiobject) => {
    handleMessage(emojiobject.target);
  };
  return (
    <>
      <div className="emoji-container">
        <EmojiPicker
          onEmojiClick={handleEmoji}
          style={{
            width: "0px !important",
          }}
        />
      </div>
    </>
  );
};

export default Emoji;
