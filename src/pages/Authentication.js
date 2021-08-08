import { useContext, useState } from "react";
import {
  Button,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import Loading from "../compnoants/UI/Loading";
import { AuthContext } from "../context";
import { useHttpClint } from "../hooks/send-request";

const useStyles = makeStyles((theme) => ({
  form: {
    maxWidth: theme.spacing(60),
    padding: theme.spacing(5),
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const Authentication = () => {
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
    <main className={classes.center}>
      {!isLoading && (
        <Paper
          component="form"
          elevation={0}
          className={classes.form}
          onSubmit={handleSubmit}
        >
          <Grid container spacing={5} alignItems="center" justify="center">
            <Grid item>
              <Typography variant="h3" color="primary">
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
            <Grid item xs={12} className={classes.center}>
              <Button
                size="large"
                variant="outlined"
                color="primary"
                type="submit"
              >
                login
              </Button>
            </Grid>
            <Grid item xs={12} className={classes.center}>
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
