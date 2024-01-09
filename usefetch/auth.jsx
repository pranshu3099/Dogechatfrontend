import { useEffect, useState } from "react";

const useFetch = () => {
  const [data, setData] = useState(false);
  const [err, setError] = useState("");
  useEffect(() => {
    const checkValidity = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/dogechat/checkvalidity`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        const data = await res.json();
        if (data?.success) {
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
