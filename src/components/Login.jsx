import Doge from "../icons/Doge.jpg";
import { Input, Button } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Axios from "axios";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import useFetch from "../../usefetch/auth";
import { useLocation } from "react-router-dom";
import phone from "../icons/phone-svgrepo-com.svg";
const react_api_url = import.meta.env.VITE_REACT_APP_API_URL;
const axios = Axios.create({
  withCredentials: true,
});
const Login = () => {
  const [mobileNumber, setMobileNumber] = React.useState("");
  const [auth, setAuth] = useState(false);
  const [Error, setError] = useState("");
  const { data, err } = useFetch();
  const location = useLocation();
  let profilepicture = location?.state?.data?.url[0].path;
  if (!profilepicture) {
    profilepicture = data?.user?.profilepicture;
  }
  const fetchData = () => {
    const info = {
      mobile_number: mobileNumber,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    axios
      .post(
        `${react_api_url}/dogechat/login`,
        { mobile_number: info.mobile_number },
        {
          headers: info.headers,
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setAuth(true);
          console.log(response);
        }
      })
      .catch((err) => {
        console.log(err);
        setError(err?.response?.data?.message);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <>
      <div className="login-main-container">
        <div className="login">
          <h1 className="login-h1">Login to Doge Chat</h1>
        </div>
        <div className="image-wrapper">
          <img
            src={profilepicture ? profilepicture : Doge}
            alt=""
            className={profilepicture ? "profilepicture" : "doge-img"}
          />
        </div>
        <form action="">
          <div className="login-container">
            <Input
              type="number"
              placeholder="mobile number"
              width={"500px"}
              margin={5}
              variant="flushed"
              name="mobile_number"
              value={mobileNumber}
              onChange={(e) => {
                setMobileNumber(e.target.value);
              }}
              style={{ color: "white" }}
            />
          </div>
          <img className="sign-up-icons" src={phone} alt="" />
          {Error !== "" && <p className="login-error">{Error}</p>}
          <div className="signup-btn">
            <Button colorScheme="blue" mr={3} mt={3} onClick={handleSubmit}>
              Login
            </Button>
          </div>
        </form>
      </div>
      {(auth || data?.user) && (
        <Navigate to="/dogechat" state={{ user: data?.user }} />
      )}
    </>
  );
};
export default Login;
