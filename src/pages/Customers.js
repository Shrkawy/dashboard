import React, { useContext, useEffect, useState } from "react";
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
import { useLogicGrid } from "../hooks/useGrid";
import { useHttpClint } from "../hooks/send-request";
import { AuthContext } from "../context/auth-context";
import Loading from "../compnoants/UI/Loading";

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
  const { userId } = useContext(AuthContext);
  const [selecteedCustomers, setSelectedCustomers] = useState({
    selectionModel: [],
  });

  const { error, isLoading, resData, sendReuest } = useHttpClint();

  useEffect(() => {
    const getCustomers = async () => {
      try {
        await sendReuest("get", `/${userId}/customers`);
      } catch (err) {}
    };

    getCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [showSelect, handleShowSelection, disableDeleteBtn, handleMultiDelete] =
    useLogicGrid(selecteedCustomers);

  const handleSetSelection = (selection) => setSelectedCustomers(selection);

  return (
    <Paper>
      <Grid container>
        <Grid item xs>
          <Typography variant="h6" className={classes.title}>
            All Customers
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
          {isLoading && <Loading />}
          {resData && (
            <DataGrid
              select={showSelect}
              customers
              data={resData.data}
              onSelectionModelChange={(selection) =>
                handleSetSelection(selection)
              }
            />
          )}
          {error && <Typography color="error">{error}</Typography>}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Customers;
