import React from "react";
import {
  Avatar,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "0 6px",
  },
  fontBig: {
    fontSize: "1.1rem",
    marginLeft: "5px",
  },
  fontSmall: {
    marginLeft: "5px",
    fontSize: "0.7rem",
  },
  nameDescription: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

const ProfileDropDown = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.root} elevation={0}>
      <Grid container alignItems="center" alignContent="space-between">
        <Grid item>
          <Avatar variant="rounded" />
        </Grid>
        <Grid item xs className={classes.nameDescription}>
          <Typography variant="h6" display="block" className={classes.fontBig}>
            Sharkawy
          </Typography>
          <Typography
            variant="subtitle2"
            display="block"
            color="textSecondary"
            className={classes.fontSmall}
          >
            Full Stack Developer
          </Typography>
        </Grid>
        <Grid item>
          <IconButton>
            <ExpandMoreIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProfileDropDown;
