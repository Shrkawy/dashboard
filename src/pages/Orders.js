import {
  Button,
  ButtonGroup,
  Grid,
  Hidden,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Delete, SelectAll } from "@material-ui/icons";
import React, { useContext, useEffect, useState } from "react";
import DataGrid from "../compnoants/DataGrid";
import Loading from "../compnoants/UI/Loading";
import Paper from "../compnoants/UI/Paper";
import { AuthContext } from "../context/auth-context";
import { useHttpClint } from "../hooks/send-request";
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
  const { userId } = useContext(AuthContext);
  const [selectedOrders, setSelectedOrders] = useState({ selectionModel: [] });
  const { error, isLoading, resData, sendReuest } = useHttpClint();
  const [showSelect, handleShowSelection, disableDeleteBtn, handleMultiDelete] =
    useLogicGrid(selectedOrders);

  useEffect(() => {
    const getOrders = async () => {
      try {
        await sendReuest("get", `/${userId}/orders`);
      } catch (err) {}
    };

    getOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSetSelection = (selection) => setSelectedOrders(selection);

  return (
    <Paper>
      <Grid container>
        <Grid item>
          <Typography variant="h6" className={classes.title}>
            All Orders
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
          {isLoading && <Loading />}
          {resData && (
            <DataGrid
              select={showSelect}
              orders
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

export default Orders;
