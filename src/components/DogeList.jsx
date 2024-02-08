import Doge from "../icons/Doge.jpg";
import { useEffect, useRef } from "react";
const DogeList = ({ handleOpen, profilepicture }) => {
  const dogeRef = useRef(null);

  const handleOpenChats = () => {
    handleOpen();
    let minWidth = 642;
    if (window.innerWidth <= minWidth) {
      dogeRef.current.style.display = "none";
    } else {
      dogeRef.current.style.display = "block";
    }
  };
  return (
    <>
      <div ref={dogeRef} className="chat-container">
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
