import { default as pureAxios } from "axios";

const userData = JSON.parse(localStorage.getItem("userData"));
let token = "";
if (userData) token = userData.token;

const axios = pureAxios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    Authorization: token,
  },
});

export default axios;
