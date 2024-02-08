import { Input, Button } from "@chakra-ui/react";
import user from "../icons/person-svgrepo-com.svg";
import Doge from "../icons/Doge.jpg";
import email from "../icons/mail-svgrepo-com.svg";
import phone from "../icons/phone-svgrepo-com.svg";
import { useReducer, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
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

  const signupReducer = (data, action) => {
    switch (action.type) {
      case "pending":
        return data;
      case "name":
        if (!name_validate(action.name)) {
          return {
            ...data,
            name: action.name,
            nameValidation: action.nameValidation,
          };
        }
        return { ...data, name: action.name, nameValidation: false };
      case "mobile_number":
        if (!mobileValidate(action.mobile_number)) {
          return {
            ...data,
            mobile_number: action.mobile_number,
            mobileVerification: action.mobileVerification,
          };
        }
        return {
          ...data,
          mobile_number: action.mobile_number,
          mobileVerification: false,
        };

      case "email":
        if (!emailValidate(action.email)) {
          return {
            ...data,
            email: action.email,
            emailVerification: action.emailVerification,
          };
        }
        return {
          ...data,
          email: action.email,
          emailVerification: false,
        };

      default:
        throw new Error("type not matched");
    }
  };
  const [data, dispatch] = useReducer(signupReducer, {
    name: "",

    mobile_number: "",

    email: "",
  });
  const [requiredFields, setRequireFields] = useState({});
  const [auth, setAuth] = useState(false);

  function fetchdata(info) {
    axios
      .post("http://localhost:3000/dogechat/register", info)
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
      name: data.name,

      mobile_number: data.mobile_number,
      email: data.email,
    };
    if (checkRequiredfields(info)) {
      fetchdata(info);
    }
  };
  return (
    <>
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
                value={data.name}
                onChange={(e) => {
                  dispatch({
                    ...data,
                    name: e.target.value,
                    type: "name",
                    nameValidation: true,
                  });
                }}
                style={{ color: "white" }}
              />
              <img className="sign-up-icons" src={user} alt="" />
              {data.nameValidation && (
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
                value={data.mobile_number}
                onChange={(e) => {
                  dispatch({
                    ...data,
                    mobile_number: e.target.value,
                    type: "mobile_number",
                    mobileVerification: true,
                  });
                }}
                style={{ color: "white" }}
              />
              <img className="sign-up-icons" src={phone} alt="" />
              {data.mobileVerification && (
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
                value={data.email}
                onChange={(e) => {
                  dispatch({
                    ...data,
                    email: e.target.value,
                    type: "email",
                    emailVerification: true,
                  });
                }}
                style={{ color: "white" }}
              />
              <img className="sign-up-icons" src={email} alt="" />
              {data.emailVerification && (
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
            </div>
          </div>
        </form>
      </div>
      {auth && (
        <Navigate
          to="/dogechat/verifyotp"
          state={{ mobileNumber: data?.mobile_number }}
        />
      )}
    </>
  );
};

export default Signup;
