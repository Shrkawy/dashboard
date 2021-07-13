import {
  Button,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { useContext, useState } from "react";
import Loading from "../compnoants/UI/Loading";
import { AuthContext } from "../context/auth-context";
import { useHttpClint } from "../hooks/send-request";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    maxWidth: theme.spacing(50),
    padding: theme.spacing(5),
  },
}));

const Authentication = (props) => {
  const { login } = useContext(AuthContext);
  const classes = useStyles();
  const [loginFormValues, setLoginFormValues] = useState({
    username: "",
    password: "",
  });
  const { error, isLoading, sendReuest } = useHttpClint();

  const handleFormInput = (e) => {
    const { name, value } = e.target;
    setLoginFormValues((curr) => ({
      ...curr,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await sendReuest("post", "/login", loginFormValues);

      if (data) {
        login(data.id, data.token.value, data.store, data.username);
      }
    } catch (err) {}
  };

  return (
    <main className={classes.root}>
      {!isLoading && (
        <Paper
          component="form"
          elevation={2}
          className={classes.form}
          onSubmit={handleSubmit}
        >
          <Grid container spacing={5} alignItems="center" justify="center">
            <Grid item>
              <Typography variant="h4" color="primary">
                Login
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="username"
                label="username"
                type="text"
                fullWidth
                value={loginFormValues.username}
                onChange={handleFormInput}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                label="password"
                type="password"
                fullWidth
                value={loginFormValues.password}
                onChange={handleFormInput}
              />
            </Grid>
            {error && (
              <Grid item>
                <Typography variant="caption" color="error">
                  {error}
                </Typography>
              </Grid>
            )}
            <Grid item>
              <Button variant="contained" color="primary" type="submit">
                login
              </Button>
            </Grid>
            <Grid item>
              <Typography variant="caption">
                don't have account? signup
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      )}
      {isLoading && <Loading />}
    </main>
  );
};

export default Authentication;
