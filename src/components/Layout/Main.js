import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
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
import { getDialogItemObject } from "../ItemDialog/get-item-object";
import ItemDialog from "../ItemDialog/ItemDialog";
import Snackbar from "../UI/Snackbar";

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

function Main({ title, children, APIUrl, products, orders, customers }) {
  const classes = useStyles();
  const { dispatch, gridState } = useContext(GridContext);
  const { rowsError, rows, gridIsLoading, disableDeleteBtn, snackbar } =
    gridState;

  let itemDetails;


  if (gridState.openDialog && gridState.dialogData) {
    itemDetails = getDialogItemObject(
      {
        products,
        orders,
        customers,
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
              onClick={() => console.log("multi delete")}
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

        <ItemDialog item={itemDetails} isLoading={gridState.dialogIsLoading} />
        <Snackbar
          open={snackbar.open}
          message={snackbar.message}
          type={snackbar.type}
        />
      </Grid>
    </Paper>
  );
}

Main.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  APIUrl: PropTypes.string.isRequired,
  products: PropTypes.bool,
  orders: PropTypes.bool,
  customers: PropTypes.bool,
};

export default Main;
