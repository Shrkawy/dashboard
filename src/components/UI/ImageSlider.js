import { IconButton, makeStyles } from "@material-ui/core";
import { ArrowBack, ArrowForward } from "@material-ui/icons";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  slider: {
    width: "100%",
    height: "max-content",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    "& div": {
      position: "relative",
      width: "80%",
      height: "30vh",
    },
    "& img": {
      position: "absolute",
      transform: "scale(0.7)",
      maxWidth: "100%",
      maxHeight: "30vh",
      opacity: 0,
      borderRadius: theme.shape.borderRadius,
    },
    "& img.active": {
      opacity: 1,
      right: 0,
      left: 0,
      top: 0,
      bottom: 0,
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: "auto",
      marginBottom: "auto",
      transform: "scale(1)",
      "-webkit-transition": "all 0.3s ease-in-out",
      "-moz-transition": "all 0.3s ease-in-out",
      "-ms-transition": "all 0.3s ease-in-out",
      "-o-transition": "all 0.3s ease-in-out",
      transition: "all 0.3s ease-in-out",
    },
  },
}));

export default function ImageSlider({ images }) {
  const classes = useStyles();
  const [current, setCurrent] = useState(0);

  const handleForwardClick = () => {
    if (current === images.length - 1) {
      return setCurrent(0);
    }
    return setCurrent((curr) => curr + 1);
  };

  const handleBackwardClick = () => {
    if (current === 0) {
      return setCurrent(images.length - 1);
    }
    return setCurrent((curr) => curr - 1);
  };
  return (
    <div className={classes.slider}>
      <IconButton size="medium" color="primary" onClick={handleBackwardClick}>
        <ArrowBack />
      </IconButton>
      <div>
        {images &&
          images.map((image, i) => {
            if (i === current)
              return (
                <img key={i} className="active" src={image} alt="product" />
              );
            return <img key={i} src={image} alt="product" />;
          })}
      </div>
      <IconButton size="medium" color="primary" onClick={handleForwardClick}>
        <ArrowForward />
      </IconButton>
    </div>
  );
}
