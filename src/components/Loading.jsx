import ReactLoading from "react-loading";
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
