import { useEffect, useState } from "react";
import axios from "axios";
import {
  Avatar,
  ButtonBase,
  Grid,
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
  disabled: {
    color: theme.palette.grey[300],
  },
}));

export default function ProgressBar(props) {
  const classes = useStyles();
  const { image, preview, setImagesArray, existed } =
    props;

  const [uploadState, setUploadState] = useState({
    id: null,
    speed: "",
    percent: 0,
    uploaded: false,
    deleted: false,
  });

  useEffect(() => {
    if (!existed) return;
    setUploadState((curr) => ({
      ...curr,
      uploaded: true,
      id: image.id,
      percent: 100,
    }));
    setImagesArray((curr) => [...curr, image]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (uploadState.deleted || existed) return;

    const startTime = new Date().getTime();

    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        let speed = getUploadSpeed(loaded, startTime);
        setUploadState((curr) => ({
          ...curr,
          speed,
          percent,
        }));
      },
    };

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", CLOUDINARY_PRESET);

    upload(formData, options).then((res) => {
      setImagesArray((curr) => [...curr, res]);
      setUploadState((curr) => ({
        ...curr,
        uploaded: true,
        id: res.id,
      }));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleDelete(e) {
    setImagesArray((curr) => curr.filter((i) => i.id !== uploadState.id));
    setUploadState({
      ...uploadState,
      deleted: true,
    });
  }

  return (
    <>
      {!uploadState.deleted && (
        <Paper variant="outlined" className={classes.Container}>
          <Grid container spacing={2} alignItems="center" justify="flex-start">
            <Grid item xs={2}>
              {!existed && (
                <Avatar variant="rounded" src={preview} alt="preview" />
              )}
              {existed && (
                <Avatar variant="rounded" src={image.url} alt="preview" />
              )}
            </Grid>
            <Grid item xs>
              <Grid container className={classes.SecondaryContainer}>
                {uploadState.percent < 100 && (
                  <>
                    <Grid item xs>
                      <Typography variant="subtitle2">{image.name}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <LinearProgress
                        className={classes.progressBar}
                        variant="determinate"
                        value={uploadState.percent}
                      />
                    </Grid>
                    <Grid item xs>
                      <Typography variant="caption" color="textSecondary">
                        {`${uploadState.percent}% done`}
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant="caption" color="textSecondary">
                        {uploadState.speed}
                      </Typography>
                    </Grid>
                  </>
                )}
                {uploadState.percent === 100 && (
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
              <ButtonBase
                disabled={!uploadState.uploaded}
                area-label="delete"
                onClick={handleDelete}
                classes={{
                  disabled: classes.disabled,
                }}
              >
                <DeleteOutline />
              </ButtonBase>
            </Grid>
          </Grid>
        </Paper>
      )}
    </>
  );
}
