import { useReducer, useState } from "react";
import { Input, Button } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Navigate } from "react-router-dom";
const otpReducer = (state, action) => {
  switch (action.type) {
    case "input1":
      return { ...state, input1: action.input1 };
    case "input2":
      return { ...state, input2: action.input2 };
    case "input3":
      return { ...state, input3: action.input3 };
    case "input4":
      return { ...state, input4: action.input4 };
    default:
      throw new Error("type not matched");
  }
};

const VerifyOtp = () => {
  const location = useLocation();
  const verificationInfo = location.state;
  let { mobileNumber } = verificationInfo;
  const [auth, setAuth] = useState(false);
  const [data, dispatch] = useReducer(otpReducer, {
    input1: "",
    input2: "",
    input3: "",
    input4: "",
  });

  const verifyuser = () => {
    let otp = data?.input1 + data?.input2 + data?.input3 + data?.input4;
    let info = {
      user_otp: otp,
      mobile_number: mobileNumber,
    };
    axios
      .post("http://localhost:3000/dogechat/verifyotp", info)
      .then((res) => {
        console.log(res);
        setAuth(res?.data?.success);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="signup-main-container">
        <div className="signup">
          <h1 className="signup-h1" style={{ color: "white" }}>
            enter the otp send to your mobile number
          </h1>
        </div>

        <form action="" className="form">
          <div className="signup-container">
            <div>
              <Input
                type="number"
                width={"50px"}
                margin={5}
                name="input1"
                value={data?.input1}
                style={{ color: "white" }}
                onChange={(e) => {
                  dispatch({
                    ...data,
                    input1: e.target.value,
                    type: "input1",
                  });
                }}
                minLength="1"
              />
              <Input
                type="number"
                width={"50px"}
                margin={5}
                name="input2"
                value={data?.input2}
                style={{ color: "white" }}
                onChange={(e) => {
                  dispatch({
                    ...data,
                    input2: e.target.value,
                    type: "input2",
                  });
                }}
              />
              <Input
                type="number"
                width={"50px"}
                margin={5}
                name="input3"
                value={data?.input3}
                style={{ color: "white" }}
                onChange={(e) => {
                  dispatch({
                    ...data,
                    input3: e.target.value,
                    type: "input3",
                  });
                }}
              />
              <Input
                type="number"
                width={"50px"}
                margin={5}
                name="input4"
                value={data?.input4}
                style={{ color: "white" }}
                onChange={(e) => {
                  dispatch({
                    ...data,
                    input4: e.target.value,
                    type: "input4",
                  });
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
