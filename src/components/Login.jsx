import Doge from "../icons/Doge.jpg";
import { Input, Button } from "@chakra-ui/react";
import React, { useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useState } from "react";
const Login = () => {
  const [mobileNumber, setMobileNumber] = React.useState("");
  const [error, setError] = React.useState("");
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3000/dogechat/checkvalidity")
      .then((response) => {
        if (response.status === 200) {
          setAuth(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const fetch = () => {
    const info = {
      mobile_number: mobileNumber,
    };
    axios
      .post("http://localhost:3000/dogechat/login", info)
      .then((response) => {
        if (response.status === 200) {
          setAuth(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch();
  };

  return (
    <>
      <div className="login-main-container">
        <div className="login">
          <h1 className="login-h1">Login to Doge Chat</h1>
        </div>
        <div>
          <img src={Doge} alt="" className="doge-img" />
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
          <div className="signup-btn">
            <Button colorScheme="blue" mr={3} mt={3} onClick={handleSubmit}>
              Login
            </Button>
          </div>
        </form>
      </div>
      {auth && <Navigate to="/dogechat/userprofile" />}
    </>
  );
};
export default Login;
