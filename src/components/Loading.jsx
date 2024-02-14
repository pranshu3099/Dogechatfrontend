import ReactLoading from "react-loading";
import dogeloading from "../icons/yyv6h-unscreen.gif";

const Loading = () => {
  return (
    <>
      <div className="loading">
        <ReactLoading
          type={"balls"}
          color={"gray"}
          height={"10%"}
          width={"10%"}
        />
      </div>
    </>
  );
};

export default Loading;
