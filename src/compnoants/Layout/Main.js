import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  Grid,
  Hidden,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Delete, SelectAll, AddCircleOutline } from "@material-ui/icons";
import { GridContext } from "../../context";
import Paper from "../UI/Paper";
import Loading from "../UI/Loading";
import { getDialogItemObject } from "../../utils/get-item-object";
import ItemDialog from "../ItemDialog";

const useStyles = makeStyles((theme) => ({
  dataGridContainer: {
    maxHeight: "68vh",
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(1.5),
  },
  btn: {
    boxShadow: "none",
  },
}));
export default function Main(props) {
  const classes = useStyles();
  const { dispatch, gridState } = useContext(GridContext);
  const { title, children, APIUrl, handleMultiDelete, ...other } = props;
  const { rowsError, rows, gridIsLoading, disableDeleteBtn } = gridState;

  let itemDetails;
  if (gridState.openDialog && gridState.dialogData) {
    itemDetails = getDialogItemObject(
      {
        products: other.products,
        orders: other.orders,
        customers: other.customers,
      },
      gridState.dialogData
    );
  }

  useEffect(() => {
    dispatch({ type: "gridAPIUrl", payload: APIUrl });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [APIUrl]);

  return (
    <Paper>
      <Grid container>
        <Grid item>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
        </Grid>
        <Grid item xs></Grid>
        <Grid item>
          <ButtonGroup className={classes.btns} size="small">
            <Button
              disableElevation
              variant="contained"
              color="primary"
              startIcon={<SelectAll />}
              onClick={() => dispatch({ type: "showSelect" })}
            >
              <Hidden smDown>Select</Hidden>
            </Button>
            <Button
              disableElevation
              variant="outlined"
              color="secondary"
              startIcon={<Delete />}
              disabled={disableDeleteBtn}
              onClick={handleMultiDelete}
            >
              <Hidden smDown>DELETE</Hidden>
            </Button>
            <Button
              disableElevation
              component={Link}
              to="/products/add-product"
              variant="contained"
              color="primary"
              startIcon={<AddCircleOutline />}
            >
              <Hidden smDown>add New</Hidden>
            </Button>
          </ButtonGroup>
        </Grid>

        <Grid item xs={12} className={classes.dataGridContainer}>
          {gridIsLoading && <Loading />}
          {rows.length > 0 && children}
          {rowsError && <Typography color="error">{rowsError}</Typography>}
        </Grid>
        {gridState.openDialog && (
          <ItemDialog
            item={itemDetails}
            isLoading={gridState.dialogIsLoading}
          />
        )}
      </Grid>
    </Paper>
  );
}
