import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: theme.shape.borderRadius,
    fontWeight: 600,
    width: "100%",
    lineHeight: "1rem",
  },
  pending: {
    backgroundColor: theme.palette.yellow.light,
    color: theme.palette.yellow.dark,
  },
  deliverd: {
    backgroundColor: theme.palette.green.light,
    color: theme.palette.green.dark,
  },
  canceled: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.secondary.dark,
  },
}));

const Status = (props) => {
  const classes = useStyles();
  const { pending, deliverd, canceled, label } = props;

  return (
    <div
      className={`${classes.root} ${
        pending
          ? classes.pending
          : deliverd
          ? classes.deliverd
          : canceled
          ? classes.canceled
          : ""
      }`}
    >
      {label}
    </div>
  );
};

export default Status;
