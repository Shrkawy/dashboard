import { useState } from "react";
import axios from "axios";

const CLOUDINARY_URL = " https://api.cloudinary.com/v1_1/sharkawy/image/upload";

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

export default function useUploadFile(data) {
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
      console.error(error);
    }
  };

  return { upload, percentage, speed };
}
