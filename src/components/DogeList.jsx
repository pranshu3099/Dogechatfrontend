import Doge from "../icons/Doge.jpg";
const DogeList = ({ handleOpen }) => {
  const handleOpenChats = () => {
    handleOpen();
  };
  return (
    <>
      <div className="chat-container">
        <div className="dog-container" onClick={handleOpenChats}>
          <img src={Doge} style={{ width: "50px" }} />
          <div className="doge-name">
            <p>cheems</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DogeList;
