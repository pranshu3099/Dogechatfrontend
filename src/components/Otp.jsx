import { useReducer, useState, useRef, useEffect } from "react";
import { Input, Button } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Navigate } from "react-router-dom";
const react_api_url = import.meta.env.VITE_REACT_APP_API_URL;
const otpReducer = (state, action) => {
  switch (action.type) {
    case "input1":
      return {
        ...state,
        input1: action.input1.slice(0, 1),
        input2: action.input1.length > 1 ? action.input1.slice(1, 2) : "",
      };
    case "input2":
      return {
        ...state,
        input2: action.input2.slice(0, 1),
        input3: action.input2.length > 1 ? action.input2.slice(1, 2) : "",
      };
    case "input3":
      return {
        ...state,
        input3: action.input3.slice(0, 1),
        input4: action.input3.length > 1 ? action.input3.slice(1, 2) : "",
      };
    case "input4":
      return {
        ...state,
        input4: action.input4.slice(0, 1),
      };
    default:
      return state;
  }
};
const VerifyOtp = () => {
  const location = useLocation();
  const verificationInfo = location.state;
  let { mobileNumber } = verificationInfo;
  const [auth, setAuth] = useState(false);
  const [focusedInput, setFocusedInput] = useState(0);
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);
  const inputRef4 = useRef(null);
  const [data, dispatch] = useReducer(otpReducer, {
    input1: "",
    input2: "",
    input3: "",
    input4: "",
  });
  // console.log(data);

  useEffect(() => {
    inputRef1.current?.focus();
  }, []);

  const verifyuser = () => {
    let otp = data?.input1 + data?.input2 + data?.input3 + data?.input4;
    let info = {
      user_otp: otp,
      mobile_number: mobileNumber,
    };
    axios
      .post(`${react_api_url}/dogechat/verifyotp`, info)
      .then((res) => {
        console.log(res);
        setAuth(res?.data?.success);
      })
      .catch((err) => console.log(err));
  };

  const movetoNextInput = (e, eve) => {
    const inputRefs = [inputRef1, inputRef2, inputRef3, inputRef4];
    // console.log(focusedInput);
    if (focusedInput === 0 && e.target.value === "") {
      return;
    } else if (e.target.value === "") {
      inputRefs[focusedInput - 1].current.disabled = false;
      inputRefs[focusedInput - 1].current.focus();
      setFocusedInput((prev) => prev - 1);
    } else if (focusedInput < inputRefs.length - 1) {
      inputRefs[focusedInput + 1].current.focus();
      inputRefs[focusedInput].current.disabled = true;
      setFocusedInput((prev) => prev + 1);
    }
  };

  return (
    <>
      <div className="signup-main-container">
        <div className="signup">
          <h1 className="signup-h1" style={{ color: "white" }}>
            enter the otp send to your email
          </h1>
        </div>

        <form action="" className="form">
          <div className="signup-container">
            <div>
              <Input
                type="number"
                width={"50px"}
                margin={5}
                ref={inputRef1}
                name="input1"
                value={data?.input1}
                style={{ color: "white" }}
                onChange={(e) => {
                  dispatch({
                    ...data,
                    input1: e.target.value,
                    type: "input1",
                  }),
                    movetoNextInput(e);
                }}
                onKeyUp={(e) => {
                  // console.log("value", e.target.value);
                  if (e.key === "Backspace" && e.target.value === "") {
                    movetoNextInput(e);
                  }
                }}
              />
              <Input
                type="number"
                width={"50px"}
                margin={5}
                ref={inputRef2}
                name="input2"
                value={data?.input2}
                style={{ color: "white" }}
                onChange={(e) => {
                  dispatch({
                    ...data,
                    input2: e.target.value,
                    type: "input2",
                  }),
                    movetoNextInput(e);
                }}
                onKeyUp={(e) => {
                  // console.log("value", e.target.value);
                  if (e.key === "Backspace" && e.target.value === "") {
                    movetoNextInput(e);
                  }
                }}
              />
              <Input
                type="number"
                width={"50px"}
                margin={5}
                ref={inputRef3}
                name="input3"
                value={data?.input3}
                style={{ color: "white" }}
                onChange={(e) => {
                  dispatch({
                    ...data,
                    input3: e.target.value,
                    type: "input3",
                  }),
                    movetoNextInput(e);
                }}
                onKeyUp={(e) => {
                  if (e.key === "Backspace" && e.target.value === "") {
                    movetoNextInput(e);
                  }
                }}
              />
              <Input
                type="number"
                width={"50px"}
                margin={5}
                ref={inputRef4}
                name="input4"
                value={data?.input4}
                style={{ color: "white" }}
                onChange={(e) => {
                  dispatch({
                    ...data,
                    input4: e.target.value,
                    type: "input4",
                  }),
                    movetoNextInput(e);
                }}
                onKeyUp={(e) => {
                  // console.log("value", e.target.value);

                  if (e.key === "Backspace" && e.target.value === "") {
                    movetoNextInput(e);
                  }
                }}
              />

              <div className="signup-btn">
                <Button colorScheme="blue" mr={3} mt={3} onClick={verifyuser}>
                  verify
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
      {auth && (
        <Navigate to="/dogechat/upload-image" state={{ mobileNumber }} />
      )}
    </>
  );
};

export default VerifyOtp;
