import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import Charts from "./charts/Charts";
import Paper from "./UI/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}));

const SummaryChart = (props) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root} elevation={0}>
      <Typography variant="subtitle2" color="textSecondary">
        {props.title}
      </Typography>
      <Typography variant="h6">{props.price}</Typography>
      <Charts.Summary
        data={props.data}
        lineColor={props.lineColor}
        fillColor={props.fillColor}
        height={65}
      />
    </Paper>
  );
};

export default SummaryChart;
