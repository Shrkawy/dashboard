import { useState } from "react";
import axios from "axios";

const SERVER_URL = "http://localhost:5000";
const CLOUDINARY_URL = " https://api.cloudinary.com/v1_1/sharkawy/image/upload";
const CLOUDINARY_PRESET = "ua2flimw";

const getUploadSpeed = (loaded, start) => {
  const currTime = new Date().getTime();
  const duration = (currTime - start) / 1000;
  let speed = (loaded / duration / 1024 / 1024).toFixed(2);

  if (speed < 1) {
    return (speed = `${(loaded / duration / 1024).toFixed(2)}Kb/sec`);
  }
  return `${speed}Mb/sec`;
};

const startTime = new Date().getTime();

export default function useAxios(data) {
  const [percentage, setPercentage] = useState(0);
  const [speed, setSpeed] = useState("");
  const options = {
    onUploadProgress: (progressEvent) => {
      const { loaded, total } = progressEvent;
      let percent = Math.floor((loaded * 100) / total);
      let speed = getUploadSpeed(loaded, startTime);
      setPercentage(percent);
      setSpeed(speed);
    },
  };

  const upload = async (uploadData) => {
    try {
      const res = await axios.post(CLOUDINARY_URL, uploadData, options);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  return { upload, percentage, speed };
}
