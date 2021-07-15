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
import Paper from "../UI/Paper";
import { useContext } from "react";
import { GridContext } from "../../context";

const useStyles = makeStyles((theme) => ({
  dataGridContainer: {
    maxHeight: "70vh",
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
  const { dispatch, gridState } = useContext(GridContext);
  const { title, children, error, handleMultiDelete } = props;
  const classes = useStyles();
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
              className={classes.btn}
              variant="contained"
              color="primary"
              startIcon={<SelectAll />}
              onClick={() => dispatch({ type: "showSelect" })}
            >
              <Hidden smDown>Select</Hidden>
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<Delete />}
              disabled={gridState.disableDeleteBtn}
              onClick={handleMultiDelete}
            >
              <Hidden smDown>DELETE</Hidden>
            </Button>
            <Button
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
          {children}
          {error && <Typography color="error">{error}</Typography>}
        </Grid>
      </Grid>
    </Paper>
  );
}
