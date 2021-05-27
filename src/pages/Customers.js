import React, { useState } from "react";
import {
  Button,
  ButtonGroup,
  Grid,
  Hidden,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Delete, SelectAll } from "@material-ui/icons";
import DataGrid from "../compnoants/DataGrid";
import Paper from "../compnoants/UI/Paper";
import CustomersData from "../data/CustomersData";
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
}));

const Customers = () => {
  const classes = useStyles();
  const [customers, setCustomers] = useState({ selectionModel: [] });

  const [
    showSelect,
    handleShowSelection,
    disableDeleteBtn,
    handleMultiDelete,
  ] = useLogicGrid(customers);

  const handleSetSelection = (selection) => setCustomers(selection);

  return (
    <Paper>
      <Grid container>
        <Grid item xs>
          <Typography variant="h6" className={classes.title}>
            All Products
          </Typography>
        </Grid>
        <Grid item xs></Grid>
        <Grid item>
          <ButtonGroup size="small">
            <Button
              disableElevation
              variant="contained"
              color="primary"
              startIcon={<SelectAll />}
              onClick={handleShowSelection}
            >
              <Hidden smDown>SELECT</Hidden>
            </Button>
            <Button
              size="small"
              disabled={disableDeleteBtn}
              variant="outlined"
              color="secondary"
              startIcon={<Delete />}
              onClick={handleMultiDelete}
            >
              DELETE
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item xs={12} className={classes.dataGridContainer}>
          <DataGrid
            select={showSelect}
            customers
            data={CustomersData}
            onSelectionModelChange={(selection) =>
              handleSetSelection(selection)
            }
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Customers;
