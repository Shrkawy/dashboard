import React from "react";
import {
  Avatar,
  Button,
  Divider,
  Grid,
  List as MuiList,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import Paper from "./Paper";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  list: {
    padding: 0,
    "& .price": {
      textAlign: "end",
    },
  },
}));

const List = (props) => {
  const classes = useStyles();

  return (
    <Paper>
      <Grid container>
        <Grid container>
          <Grid item>
            <Typography variant="h6">{props.title}</Typography>
          </Grid>
          <Grid item xs></Grid>
          <Grid item>
            <Button component={Link} to={props.href} variant="text">
              See All
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <MuiList className={classes.list}>
            {props.data
              .sort((a, b) => b.sold - a.sold)
              .map((item) => (
                <div key={item.id}>
                  <Divider />
                  <ListItem button>
                    <ListItemAvatar>
                      <Avatar variant="rounded" alt="" src={item.img} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.productName}
                      secondary={item.category}
                    />
                    <ListItemText
                      className="price"
                      primary={`$${item.price}`}
                    />
                  </ListItem>
                </div>
              ))}
          </MuiList>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default List;
