import { useEffect, useState } from "react";
const react_api_url = import.meta.env.VITE_REACT_APP_API_URL;
const useFetch = () => {
  const [data, setData] = useState(false);
  const [err, setError] = useState("");
  useEffect(() => {
    const checkValidity = async () => {
      try {
        const res = await fetch(`${react_api_url}/dogechat/checkvalidity`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await res.json();
        if (data) {
          setData(data);
        }
      } catch (err) {
        setError(err);
        console.log(err);
      }
    };
    checkValidity();
  }, []);
  return { data, err };
};

export default useFetch;
