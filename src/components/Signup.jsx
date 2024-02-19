import { Input, Button } from "@chakra-ui/react";
import user from "../icons/person-svgrepo-com.svg";
import Doge from "../icons/Doge.jpg";
import email from "../icons/mail-svgrepo-com.svg";
import phone from "../icons/phone-svgrepo-com.svg";
import { useReducer, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Loading from "./Loading";
import useFetch from "../../usefetch/auth";
const react_api_url = import.meta.env.VITE_REACT_APP_API_URL;
const Signup = () => {
  const mobileValidate = (number) => {
    return /(?=.{10}$)/.test(number);
  };

  const name_validate = (name) => {
    return /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(name);
  };

  const emailValidate = (text) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(text);
  };

  const signupReducer = (user_data, action) => {
    switch (action.type) {
      case "pending":
        return user_data;
      case "name":
        if (!name_validate(action.name)) {
          return {
            ...user_data,
            name: action.name,
            nameValidation: action.nameValidation,
          };
        }
        return { ...user_data, name: action.name, nameValidation: false };
      case "mobile_number":
        if (!mobileValidate(action.mobile_number)) {
          return {
            ...user_data,
            mobile_number: action.mobile_number,
            mobileVerification: action.mobileVerification,
          };
        }
        return {
          ...user_data,
          mobile_number: action.mobile_number,
          mobileVerification: false,
        };

      case "email":
        if (!emailValidate(action.email)) {
          return {
            ...user_data,
            email: action.email,
            emailVerification: action.emailVerification,
          };
        }
        return {
          ...user_data,
          email: action.email,
          emailVerification: false,
        };

      default:
        throw new Error("type not matched");
    }
  };
  const [user_data, dispatch] = useReducer(signupReducer, {
    name: "",

    mobile_number: "",

    email: "",
  });
  const [requiredFields, setRequireFields] = useState({});
  const [auth, setAuth] = useState(false);
  const [loading, setloading] = useState(false);
  const { data, err } = useFetch();
  function fetchdata(info) {
    axios
      .post(`${react_api_url}/dogechat/register`, info)
      .then((response) => {
        if (response.status === 201) {
          setAuth(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function checkRequiredfields(info) {
    const res = {};
    Object.keys(info).forEach((key) => {
      if (info[key] === "") {
        res[key] = true;
      }
    });
    if (Object.keys(res).length) {
      setRequireFields(res);
      return false;
    } else {
      setRequireFields({});
      return true;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const info = {
      name: user_data.name,

      mobile_number: user_data.mobile_number,
      email: user_data.email,
    };
    if (checkRequiredfields(info)) {
      let user_info = [];
      user_info.push(info);
      localStorage.setItem("user_info", JSON.stringify(user_info));
      setloading(true);
      fetchdata(info);
    }
  };
  return (
    <>
      {!data && <Loading />}
      <div className="signup-main-container">
        <div className="signup">
          <h1 className="signup-h1" style={{ color: "white" }}>
            Hello vro!! Welcome to Doge Chat
          </h1>
        </div>
        <div className="doge-img-container">
          <img src={Doge} alt="" className="doge-img" />
        </div>
        <form action="" className="form">
          <div className="signup-container">
            <div>
              <Input
                type="text"
                placeholder="your name"
                width={"500px"}
                margin={5}
                variant="flushed"
                name="name"
                value={user_data.name}
                onChange={(e) => {
                  dispatch({
                    ...user_data,
                    name: e.target.value,
                    type: "name",
                    nameValidation: true,
                  });
                }}
                style={{ color: "white" }}
              />
              <img className="sign-up-icons" src={user} alt="" />
              {user_data.nameValidation && (
                <div style={{ color: "red" }}>Invalid Name</div>
              )}
              {requiredFields.name && (
                <div style={{ color: "red" }}>Name field is required</div>
              )}
              <Input
                type="number"
                placeholder="mobile number"
                width={"500px"}
                margin={5}
                variant="flushed"
                name="mobile_number"
                value={user_data.mobile_number}
                onChange={(e) => {
                  dispatch({
                    ...user_data,
                    mobile_number: e.target.value,
                    type: "mobile_number",
                    mobileVerification: true,
                  });
                }}
                style={{ color: "white" }}
              />
              <img className="sign-up-icons" src={phone} alt="" />
              {user_data.mobileVerification && (
                <div style={{ color: "red" }}>
                  Mobile number must be of 10 digits
                </div>
              )}
              {requiredFields.mobile_number && (
                <div style={{ color: "red" }}> Mobile number is required</div>
              )}

              <Input
                type="email"
                placeholder="your email"
                width={"500px"}
                margin={5}
                variant="flushed"
                name="email"
                value={user_data.email}
                onChange={(e) => {
                  dispatch({
                    ...user_data,
                    email: e.target.value,
                    type: "email",
                    emailVerification: true,
                  });
                }}
                style={{ color: "white" }}
              />
              <img className="sign-up-icons" src={email} alt="" />
              {user_data.emailVerification && (
                <div style={{ color: "red" }}>Invalid email address</div>
              )}
              {requiredFields.email && (
                <div style={{ color: "red" }}> email address is required</div>
              )}

              <div className="signup-btn">
                <Button colorScheme="blue" mr={3} mt={3} onClick={handleSubmit}>
                  Signup
                </Button>
              </div>
              <div className="signup-login-container">
                <p>
                  Already have an account <a href="/dogechat/login">login</a>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
      {auth && (
        <Navigate
          to="/dogechat/verifyotp"
          state={{
            mobileNumber: user_data?.mobile_number,
            userEmail: user_data?.email,
          }}
        />
      )}
      {data?.user && <Navigate to="/dogechat" state={{ user: data?.user }} />}
    </>
  );
};

export default Signup;
