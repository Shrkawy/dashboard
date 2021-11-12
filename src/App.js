import { lazy, Suspense } from "react";
import { makeStyles } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import ThemeProvider from "./components/ThemeProvider";
import Loading from "./components/UI/Loading";
import { AuthContext } from "./context";
import { useAuth } from "./hooks/auth-hook";

const FixedLayout = lazy(() => import("./components/Layout/FixedLayout"));
// routes
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Orders = lazy(() => import("./pages/Orders"));
const Products = lazy(() => import("./pages/Products"));
const Customers = lazy(() => import("./pages/Customers/Customers"));
const Messages = lazy(() => import("./pages/Messages/Messages"));
const Settings = lazy(() => import("./pages/Settings/Settings"));
const AddProduct = lazy(() => import("./pages/AddProduct"));
const Authentication = lazy(() => import("./pages/Authentication"));

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: theme.spacing(10),
    minHeight: "50vh",
  },
  spinner: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default function App() {
  const classes = useStyles();
  const { authData, login, logout } = useAuth();

  const authProviderValue = {
    isLoggedIn: !!authData?.token,
    token: authData?.token,
    userId: authData?.userId,
    username: authData?.username,
    store: authData?.store,
    login: login,
    logout: logout,
  };

  let routes;
  if (authData?.token) {
    routes = (
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
    );
  } else {
    routes = (
      <Switch>
        <Route path="/">
          <Authentication />
        </Route>
      </Switch>
    );
  }

  return (
    <ThemeProvider>
      <AuthContext.Provider value={authProviderValue}>
        <Router>
          <div className={classes.root}>
            <Suspense
              fallback={
                <div className={classes.spinner}>
                  <Loading />
                </div>
              }
            >
              {authData?.token && <FixedLayout />}
              <main className={classes.content}>
                <Suspense fallback={<Loading />}>{routes}</Suspense>
              </main>
            </Suspense>
          </div>
        </Router>
      </AuthContext.Provider>
    </ThemeProvider>
  );
}
