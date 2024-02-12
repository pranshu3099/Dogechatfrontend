import { useState } from "react";
import upload from "../icons/upload-svgrepo-com.svg";
import Doge from "../icons/Doge.jpg";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
const react_api_url = import.meta.env.VITE_REACT_APP_API_URL;
const Image = () => {
  const [selectedFile, setSelectedFile] = useState([]);
  const [data, setData] = useState(null);
  const location = useLocation();
  const verificationInfo = location.state;
  const { mobileNumber, userEmail } = verificationInfo;
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setSelectedFile([...selectedFile, file]);
  };

  const uploadImages = () => {
    const formData = new FormData();
    selectedFile.forEach((image) => {
      formData.append("images", image);
    });
    try {
      formData.append("mobile_number", mobileNumber);
      const response = axios
        .post(`${react_api_url}/dogechat/uploadimage`, formData)
        .then((res) => {
          setData(res?.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="user-image-main-container">
        <div className="doge-img-container">
          <img src={Doge} alt="" className="doge-img" />
        </div>
        <div className="user-image-container">
          <form method="post" encType="multipart/form-data">
            <div className="upload-img">
              <img style={{ width: "80px" }} src={upload} alt="" />
              <p>Drag and drop files to upload or</p>
            </div>
            <div className="input">
              <label htmlFor="files" className="custom-file-input">
                Browse
              </label>

              <input
                type="file"
                accept="image/*"
                id="files"
                onChange={handleFileInputChange}
                name="images"
                multiple
              />
              {selectedFile.length > 0 && (
                <span className="file-name" style={{ color: "white" }}>
                  {selectedFile?.[0]?.name}
                </span>
              )}
            </div>
          </form>

          <div className="upload">
            <button onClick={uploadImages}>Upload</button>
          </div>
        </div>
      </div>
      {data && <Navigate to="/dogechat/login" state={{ data: data }} />}
    </>
  );
};

export default Image;
