import React from "react";
import {
  Divider,
  Drawer as MuiDrawer,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  useTheme,
} from "@material-ui/core";
import StorefrontIcon from "@material-ui/icons/Storefront";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MessageIcon from "@material-ui/icons/Message";
import SettingsIcon from "@material-ui/icons/Settings";
import { NavLink } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  listItem: {
    textDecoration: "none",
    color: "inherit",
    "&.active": {
      backgroundColor: theme.palette.primary.main,
      color: "#fff",
      "& .MuiSvgIcon-root": {
        color: "#FFF",
      },
    },
  },
  logo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.primary.main,
    fontSize: "1.5rem",
    "& span": {
      color: theme.palette.green.main,
      marginLeft: "5px",
    },
  },
}));

const listItems = [
  { title: "Dashboard", icon: <StorefrontIcon />, to: "/", exact: "exact" },
  { title: "Orders", icon: <ShoppingCartIcon />, to: "/orders" },
  { title: "Products", icon: <LocalMallIcon />, to: "/products" },
  { title: "Customers", icon: <AccountCircleIcon />, to: "/customers" },
  { title: "Messages", icon: <MessageIcon />, to: "/messages" },
];

const Drawer = (props) => {
  const classes = useStyles();
  const { window } = props;
  const theme = useTheme();

  const drawer = (
    <div>
      <div>
        <h3 className={classes.logo}>
          Shark<span>Board</span>
        </h3>
      </div>
        <List>
          {listItems.map((item) =>
            item.exact ? (
              <ListItem
                button
                component={NavLink}
                to={item.to}
                exact
                key={item.title}
                className={classes.listItem}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItem>
            ) : (
              <ListItem
                component={NavLink}
                button
                to={item.to}
                key={item.title}
                className={classes.listItem}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItem>
            )
          )}
        </List>
        <Divider />
        <List>
          {["Settings"].map((text) => (
            <ListItem
              button
              to="/settings"
              key={text}
              component={NavLink}
              className={classes.listItem}
            >
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      <Hidden smUp implementation="css">
        <MuiDrawer
          container={container}
          variant="temporary"
          anchor={theme.direction === "rtl" ? "right" : "left"}
          open={props.mobileOpen}
          onClose={props.handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {drawer}
        </MuiDrawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <MuiDrawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer}
        </MuiDrawer>
      </Hidden>
    </nav>
  );
};

export default Drawer;
