import React from "react";
import { makeStyles } from "@material-ui/core";
import ThemeProvider from "./compnoants/ThemeProvider";
import FixedLayout from "./compnoants/Layout/FixedLayout";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import Customers from "./pages/Customers";
import Messages from "./pages/Messages";
import Settings from "./pages/Settings";
import AddProduct from "./pages/AddProduct";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: theme.spacing(10),
  },
}));

function App() {
  const classes = useStyles();

  return (
    <ThemeProvider>
      <Router>
        <div className={classes.root}>
          <FixedLayout />
          <main className={classes.content}>
            <Switch>
              <Route path="/orders">
                <Orders />
              </Route>
              <Route path="/products/add-product">
                <AddProduct />
              </Route>
              <Route path="/products">
                <Products />
              </Route>
              <Route path="/customers">
                <Customers />
              </Route>
              <Route path="/messages">
                <Messages />
              </Route>
              <Route path="/settings">
                <Settings />
              </Route>
              <Route path="/" exact>
                <Dashboard />
              </Route>
              <Redirect to="/" />
            </Switch>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
