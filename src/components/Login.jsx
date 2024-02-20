import Doge from "../icons/Doge.jpg";
import { Input, Button } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Axios from "axios";
import { Navigate, json } from "react-router-dom";
import { useState } from "react";
import TokenValidity from "../../tokenvalidity/auth";
import { useLocation } from "react-router-dom";
import email from "../icons/mail-svgrepo-com.svg";
import Loading from "./Loading";
const react_api_url = import.meta.env.VITE_REACT_APP_API_URL;
const axios = Axios.create({
  withCredentials: true,
});
const Login = () => {
  const [youremail, setYourEmail] = React.useState("");
  const [auth, setAuth] = useState(false);
  const [Error, setError] = useState("");
  const [loading, setloading] = useState(false);
  const { data, err } = TokenValidity();
  const location = useLocation();
  let profilepicture = location?.state?.data?.url[0].path;
  if (!profilepicture) {
    profilepicture = data?.user?.profilepicture;
  }
  const user_info = JSON.parse(localStorage.getItem("user_info"));
  const mobile_number = user_info?.[0]?.mobile_number;
  const fetchData = () => {
    const info = {
      email: youremail,
      mobile_number: mobile_number,
    };
    axios
      .post(`${react_api_url}/dogechat/login`, info, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 201) {
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
    if (youremail === "") {
      setError("Email is required");
    } else {
      setloading(true);
      fetchData();
    }
  };

  return (
    <>
      {(loading && <Loading />) || (!data && <Loading />)}

      {!data?.success && (
        <div className="login-main-container">
          <h1 className="login-h1">Login to Doge Chat</h1>
          <div className="image-wrapper">
            <img
              src={profilepicture ? profilepicture : Doge}
              alt=""
              className={profilepicture ? "profilepicture" : "doge-img"}
            />
          </div>
          <div className="login-container">
            <Input
              type="text"
              placeholder="your email"
              width={"500px"}
              margin={5}
              variant="flushed"
              name="email"
              value={youremail}
              className="login-input"
              onChange={(e) => {
                setYourEmail(e.target.value);
              }}
              style={{ color: "white" }}
            />
          </div>
          <img className="login-icons" src={email} alt="" />
          {Error !== "" && <p className="login-error">{Error}</p>}
          <div className="login-btn">
            <Button colorScheme="blue" mr={3} mt={3} onClick={handleSubmit}>
              Login
            </Button>
          </div>
        </div>
      )}

      {auth && (
        <Navigate
          to="/dogechat/verifyotp"
          state={{
            mobileNumber: mobile_number,
            for_login: true,
            userEmail: youremail,
          }}
        />
      )}
      {data?.user && <Navigate to="/dogechat" state={{ user: data?.user }} />}
    </>
  );
};
export default Login;
