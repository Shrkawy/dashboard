import { forwardRef, lazy, useContext } from "react";
import { Button, Dialog, Grid, makeStyles, Slide } from "@material-ui/core";
import { ArrowForward, DeleteForeverOutlined, Edit } from "@material-ui/icons";
import Loading from "./UI/Loading";
import { GridContext } from "../context";
const ImageSlider = lazy(() => import("./UI/ImageSlider"));

const useStyles = makeStyles((theme) => ({
  dialogContainer: {
    "& .MuiDialog-container.MuiDialog-scrollPaper": {
      position: "fixed",
      display: "block",
      top: 0,
      right: 0,
      margin: "0px",
      [theme.breakpoints.down("sm")]: { width: "100vw" },
      [theme.breakpoints.between("sm", "md")]: { width: "90vw" },
      [theme.breakpoints.between("md", "lg")]: { width: "50vw" },
      [theme.breakpoints.up("lg")]: { width: "40vw" },
    },
    "& .MuiDialog-paper": {
      margin: "0px",
      padding: theme.spacing(2),
    },
    "& .MuiDialog-paperScrollPaper": {
      display: "block",
      maxHeight: "100%",
    },
    "& .MuiDialog-paperWidthSm": {
      maxWidth: "100%",
      width: "100%",
      height: "100%",
    },
    "& .MuiPaper-rounded": {
      borderRadius: "0px",
    },
  },
  gridItem: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  item: {
    marginBottom: theme.spacing(2),
    "& p": {
      margin: "0px",
      padding: "0px",
      fontWeight: theme.typography.fontWeightLight,
    },
    "& > p:first-child": {
      color: theme.palette.text.hint,
      fontSize: theme.typography.caption.fontSize,
    },
  },
}));

const Transition = forwardRef((props, ref) => {
  return <Slide direction="left" ref={ref} {...props} />;
});

/**
 * @param {object} item must path not empty Object
 */

export default function ItemDialog({ item, isLoading }) {
  const classes = useStyles();
  const { dispatch } = useContext(GridContext);

  const handleHideClick = () => {
    dispatch({ type: "openDialog" });
    dispatch({ type: "selectedItem", payload: null });
    dispatch({ type: "dialogData", payload: null });
  };

  return (
    <Dialog
      open
      TransitionComponent={Transition}
      onBackdropClick={handleHideClick}
      keepMounted
      hideBackdrop
      className={classes.dialogContainer}
    >
      <Grid container direction="column" spacing={2}>
        <Grid item xs={12}>
          <Button
            startIcon={<ArrowForward />}
            aria-label="hide"
            color="primary"
            size="small"
            onClick={handleHideClick}
          >
            Hide
          </Button>
        </Grid>
        {(!item || Array.isArray(item) || Object.keys(item).length === 0) &&
          (isLoading ? (
            <Loading />
          ) : (
            <Grid item lg={12} className={classes.gridItem}>
              <p style={{ color: "red" }}>something went wrong!</p>
            </Grid>
          ))}

        {item && !Array.isArray(item) && Object.keys(item).length > 0 && (
          <>
            <Grid item lg={12} className={classes.gridItem}>
              <Button
                startIcon={<Edit />}
                aria-label="edit"
                color="primary"
                size="medium"
                disableElevation
              >
                Edit
              </Button>
              <Button
                startIcon={<DeleteForeverOutlined />}
                aria-label="delete"
                color="secondary"
                size="medium"
                variant="contained"
                disableElevation
              >
                Delete
              </Button>
            </Grid>
            <Grid item sm={12} className={classes.gridItem}>
              {item.images && <ImageSlider images={item.images} />}
            </Grid>
            <Grid item xs={12}>
              {Object.entries(item).map(([key, value]) => {
                if (key === "images") {
                  return null;
                }
                return (
                  <div key={key} className={classes.item}>
                    <p>{key}</p>
                    <p>{value}</p>
                  </div>
                );
              })}
            </Grid>
          </>
        )}
      </Grid>
    </Dialog>
  );
}
