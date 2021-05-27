import { useEffect, useState } from "react";
import axios from "axios";
import {
  Avatar,
  Grid,
  IconButton,
  LinearProgress,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { DeleteOutline } from "@material-ui/icons";

const CLOUDINARY_URL = " https://api.cloudinary.com/v1_1/sharkawy/image/upload";
const CLOUDINARY_PRESET = "ua2flimw";

const upload = async (data, options) => {
  try {
    const res = await axios.post(CLOUDINARY_URL, data, options);
    const url = res.data.secure_url;
    const id = res.data.signature;
    return { id, url };
  } catch (error) {
    console.log(error);
  }
};

const getUploadSpeed = (loaded, start) => {
  const currTime = new Date().getTime();
  const duration = (currTime - start) / 1000;
  let speed = (loaded / duration / 1024 / 1024).toFixed(2);

  if (speed < 1) {
    return (speed = `${(loaded / duration / 1024).toFixed(2)}Kb/sec`);
  }
  return `${speed}Mb/sec`;
};

const useStyles = makeStyles((theme) => ({
  Container: {
    padding: theme.spacing(1),
  },
  SecondaryContainer: {
    "& .MuiGrid-item": {
      display: "flex",
      justifyContent: "space-between",
    },
  },
  progressBar: {
    width: "100%",
    "&.MuiLinearProgress-colorPrimary": {
      backgroundColor: theme.palette.green.light,
    },
    "& .MuiLinearProgress-barColorPrimary": {
      backgroundColor: theme.palette.green.main,
    },
  },
}));

const ProgressBar = (props) => {
  const classes = useStyles();

  const { image, preview, setImages, setImagesArray } = props;
  const [percentage, setPercentage] = useState(0);
  const [speed, setSpeed] = useState("");

  useEffect(() => {
    const startTime = new Date().getTime();
    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        let speed = getUploadSpeed(loaded, startTime);
        setPercentage(percent);
        setSpeed(speed);
      },
    };
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", CLOUDINARY_PRESET);
    upload(formData, options).then((res) => {
      setImagesArray((curr) => [...curr, res]);
    });
  }, [image, setImagesArray]);

  function handleDelete(e) {
    console.log(e.target.parentNode);
    setImagesArray((curr) => curr.filter((i) => i.id !== e.id));
  }

  return (
    <Paper variant="outlined" className={classes.Container}>
      <Grid container spacing={2} alignItems="center" justify="flex-start">
        <Grid item xs={2}>
          <Avatar variant="rounded" src={preview} alt="preview" />
        </Grid>
        <Grid item xs>
          <Grid container className={classes.SecondaryContainer}>
            {percentage < 100 && (
              <>
                <Grid item xs>
                  <Typography variant="subtitle2">{image.name}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <LinearProgress
                    className={classes.progressBar}
                    variant="determinate"
                    value={percentage}
                  />
                </Grid>
                <Grid item xs>
                  <Typography variant="caption" color="textSecondary">
                    {`${percentage}% done`}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="caption" color="textSecondary">
                    {speed}
                  </Typography>
                </Grid>
              </>
            )}
            {percentage === 100 && (
              <>
                <Grid item xs>
                  <Typography variant="subtitle2">{image.name}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="caption" color="textSecondary">
                    {image.size < 1000000
                      ? `${(image.size / 1000).toFixed(2)}Kb`
                      : `${(image.size / 1000000).toFixed(2)}Mb`}
                  </Typography>
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
        <Grid item xs={2}>
          <IconButton onClick={handleDelete}>
            <DeleteOutline />
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProgressBar;
