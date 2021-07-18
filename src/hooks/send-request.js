/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

function getToken() {
  const userData = JSON.parse(localStorage.getItem("userData"));

  let token = "";

  if (userData) token = userData.token;

  return token;
}

export const useHttpClint = () => {
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(null);

  const sendReuest = useCallback(
    async (method = "get", url = null, data = null) => {
      if (url) {
        setIsloading(true);
        try {
          const res = await axios({
            method,
            headers: {
              Authorization: getToken(),
            },
            url: `${process.env.REACT_APP_BACKEND_URL + url}`,
            data,
          });

          if (!res.data.success) {
            setError(res.data.message);
            setIsloading(false);
            return;
          }

          setIsloading(false);
          return res.data;
        } catch (err) {
          setIsloading(false);
          setError(err.message);
        }
      } else return;
    },
    []
  );

  useEffect(() => {
    sendReuest();
  }, []);

  return { isLoading, error, sendReuest };
};
