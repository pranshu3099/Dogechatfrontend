import Doge from "../icons/Doge.jpg";
import { Navigate } from "react-router-dom";
import useFetch from "../../usefetch/auth";
import Loading from "./Loading";
const home = () => {
  const { data, err } = useFetch();
  return (
    <>
      {!data && <Loading />}

      {!data?.success && (
        <div className="home-main-container">
          <div className="home-sub-container">
            <div className="home-container">
              <h1 className="home-h1">Hi i am Doge</h1>
            </div>
            <div className="doge-img-container">
              <img src={Doge} alt="" className="doge-img" />
            </div>
            <div className="home-login-btn">
              <a href="/dogechat/login">Click here to Login</a>
            </div>
          </div>
          <div className="home-signup-container">
            <div>
              <h1>New Here</h1>
              <p>Sign-up and have fun chatting with doge</p>
            </div>
            <div className="home-signup-btn">
              <a href="/dogechat/signup">Click here to sign-up</a>
            </div>
          </div>
        </div>
      )}
      {data?.user && <Navigate to="/dogechat" state={{ user: data?.user }} />}
    </>
  );
};
export default home;
