import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  Grid,
  Hidden,
  makeStyles,
  Typography,
} from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import DeleteIcon from "@material-ui/icons/Delete";
import { SelectAll } from "@material-ui/icons";
import DataGrid from "../compnoants/DataGrid";
import Paper from "../compnoants/UI/Paper";
import { useDataGridSelection } from "../hooks/useDataGridSelection";
import Loading from "../compnoants/UI/Loading";
import { AuthContext } from "../context/auth-context";
import { useHttpClint } from "../hooks/send-request";

const useStyles = makeStyles((theme) => ({
  dataGridContainer: {
    height: "70vh",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(1.5),
  },
  btns: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    "& > *": {
      boxShadow: "none",
    },
  },
}));

const Products = () => {
  const classes = useStyles();

  const [selection, setSelection] = useState({ selectionModel: [] });
  const { userId } = useContext(AuthContext);
  const { error, isLoading, resData, sendReuest } = useHttpClint();

  useEffect(() => {
    const getProducts = async () => {
      try {
        await sendReuest("get", `/${userId}/products`);
      } catch (err) {}
    };

    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [showSelect, handleShowSelection, disableDeleteBtn, handleMultiDelete] =
    useDataGridSelection(selection);

  const handleSetSelection = (selection) => setSelection(selection);

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
          <ButtonGroup className={classes.btns} size="small">
            <Button
              className={classes.btn}
              variant="contained"
              color="primary"
              startIcon={<SelectAll />}
              onClick={handleShowSelection}
            >
              <Hidden smDown>Select</Hidden>
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<DeleteIcon />}
              disabled={disableDeleteBtn}
              onClick={handleMultiDelete}
            >
              <Hidden smDown>DELETE</Hidden>
            </Button>
            <Button
              component={Link}
              to="/products/add-product"
              variant="contained"
              color="primary"
              startIcon={<AddCircleOutlineIcon />}
            >
              <Hidden smDown>New Product</Hidden>
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item xs={12} className={classes.dataGridContainer}>
          {isLoading && <Loading />}
          {resData && (
            <DataGrid
              onSelectionModelChange={(selection) =>
                handleSetSelection(selection)
              }
              select={showSelect}
              products
              data={resData.data}
            />
          )}

          {error && <Typography color="error">{error}</Typography>}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Products;
