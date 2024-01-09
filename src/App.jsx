import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import VerifyOtp from "./components/Otp";
import { Chat } from "./components/Chat";
import Image from "./components/Image";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/dogechat/login" element={<Login />}></Route>
          <Route path="/dogechat/signup" element={<Signup />}></Route>
          <Route path="/dogechat/verifyotp" element={<VerifyOtp />}></Route>
          <Route path="/dogechat" element={<Chat />}></Route>
          <Route path="/dogechat/upload-image" element={<Image />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
