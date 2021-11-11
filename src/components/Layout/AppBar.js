import {
  AppBar as MuiAppBar,
  Grid,
  IconButton,
  InputAdornment,
  makeStyles,
  Toolbar,
} from "@material-ui/core";
import React from "react";
import MenuIcon from "@material-ui/icons/Menu";
import Input from "../UI/Input";
import { Search } from "@material-ui/icons";
import NotificationIcon from "../NotificationIcon";
import ProfileDropDown from "../ProfileDropDown";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      backgroundColor: theme.palette.background.default,
      boxShadow: "none",
      "& inputField": {
        display: "none",
      },
    },
  },
  inputField: {
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    boxSizing: "border-box",
    // "&:hover": {
    //   outline: `1px solid ${theme.palette.primary.main}`,
    // },
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  rightSide: {
    width: "100%",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "flex-end",
    "& > *": {
      marginLeft: theme.spacing(1),
    },
  },
}));

const AppBar = (props) => {
  const classes = useStyles();

  return (
    <MuiAppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={props.handleDrawerToggle}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Grid container alignItems="center" justify="space-between">
          <Grid item sm={5} md={7}>
            <Input
              className={classes.inputField}
              fullWidth
              shrink="true"
              placeholder="Search for"
              variant="standard"
              InputProps={{
                disableUnderline: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item className={classes.rightSide} xs>
            <NotificationIcon />
            <ProfileDropDown />
          </Grid>
        </Grid>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
