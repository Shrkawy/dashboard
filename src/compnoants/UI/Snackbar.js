import { Slide, Snackbar as MuiSnackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { forwardRef } from "react";

const Transition = forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Snackbar({ open, message, type }) {
  return (
    <MuiSnackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      open={open}
      TransitionComponent={Transition}
    >
      <Alert severity={type}>{message}</Alert>
    </MuiSnackbar>
  );
}
