import { forwardRef } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@material-ui/core";

const Transition = forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmDialog = ({ open, setOpen, setConfirm }) => {
  const handleConfirm = () => {
    setConfirm(true);
    setOpen(false);
  };
  const handleCancel = () => {
    setConfirm(false);
    setOpen(false);
  };

  return (
    <Dialog
      TransitionComponent={Transition}
      open={open}
      keepMounted
      aria-labelledby="worning-dialog-title"
      aria-describedby="worning-dialog-description"
    >
      <DialogTitle id="worning-dialog-title" style={{ color: "red" }}>
        Worning
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="worning-dialod-description">
          the item will be deleted perminantly, this action can't be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={handleCancel}>
          cancel
        </Button>
        <Button
          color="secondary"
          variant="contained"
          disableElevation
          onClick={handleConfirm}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  setConfirm: PropTypes.func.isRequired,
};

export default ConfirmDialog;
