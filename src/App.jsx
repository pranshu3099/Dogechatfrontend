import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import VerifyOtp from "./components/Otp";
import Profile from "./components/Profile";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/dogechat/login" element={<Login />}></Route>
          <Route path="/dogechat/signup" element={<Signup />}></Route>
          <Route path="/dogechat/verifyotp" element={<VerifyOtp />}></Route>
          <Route path="/dogechat/userprofile" element={<Profile />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
