import { useContext } from "react";
import { NavLink } from "react-router-dom";
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
import ExitToAppTwoToneIcon from "@material-ui/icons/ExitToAppTwoTone";
import { AuthContext } from "../../context";

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
  logoContainer: {
    textDecoration: "none",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.primary.main,
    fontSize: "1.5rem",
    "& span": {
      color: theme.palette.green.main,
      marginLeft: "0.4rem",
    },
  },
  logoutBtn: {
    width: "100%",
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
  const { logout } = useContext(AuthContext);
  const classes = useStyles();
  const { window } = props;
  const theme = useTheme();

  const drawer = (
    <div>
      <NavLink to="/" className={classes.logoContainer}>
        <h3 className={classes.logo}>
          Shark<span>Board</span>
        </h3>
      </NavLink>
      <List>
        {listItems.map((item) =>
          item.exact ? (
            <ListItem
              button
              component={NavLink}
              onClick={() => props.setMobileOpen(false)}
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
              onClick={() => props.setMobileOpen(false)}
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
            onClick={() => props.setMobileOpen(false)}
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
      <List className={classes.logoutBtn}>
        <ListItem button component={NavLink} to="/" onClick={() => logout()}>
          <ListItemIcon>
            <ExitToAppTwoToneIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
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
