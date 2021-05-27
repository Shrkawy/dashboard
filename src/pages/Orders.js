import {
  Button,
  ButtonGroup,
  Grid,
  Hidden,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Delete, SelectAll } from "@material-ui/icons";
import React, { useState } from "react";
import DataGrid from "../compnoants/DataGrid";
import Paper from "../compnoants/UI/Paper";
import OrdersData from "../data/OrdersData";
import { useLogicGrid } from "../hooks/useGrid";

const useStyles = makeStyles((theme) => ({
  dataGridContainer: {
    height: "70vh",
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

const Orders = () => {
  const classes = useStyles();
  const [orders, setOrders] = useState({ selectionModel: [] });

  const [
    showSelect,
    handleShowSelection,
    disableDeleteBtn,
    handleMultiDelete,
  ] = useLogicGrid(orders);

  const handleSetSelection = (selection) => setOrders(selection);


  return (
    <Paper>
      <Grid container>
        <Grid item>
          <Typography variant="h6" className={classes.title}>
            All Products
          </Typography>
        </Grid>
        <Grid item xs></Grid>
        <Grid item>
          <ButtonGroup size="small">
            <Button
              className={classes.btn}
              variant="contained"
              color="primary"
              startIcon={<SelectAll />}
              onClick={handleShowSelection}
            >
              <Hidden smDown>SELECT</Hidden>
            </Button>
            <Button
              disabled={disableDeleteBtn}
              className={classes.btn}
              variant="outlined"
              color="secondary"
              startIcon={<Delete />}
              onClick={handleMultiDelete}
            >
              <Hidden smDown>DELETE</Hidden>
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item xs={12} className={classes.dataGridContainer}>
          <DataGrid
            select={showSelect}
            orders
            data={OrdersData}
            onSelectionModelChange={(selection) =>
              handleSetSelection(selection)
            }
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Orders;
