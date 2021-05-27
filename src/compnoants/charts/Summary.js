import { makeStyles } from "@material-ui/core";
import React from "react";
import { Line } from "react-chartjs-2";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: theme.spacing(1),
  },
}));

const Summary = (props) => {
  const classes = useStyles();
  return (
    <Line
      className={classes.root}
      {...props}
      data={{
        labels: ["12am", "4am", "8am", "12pm", "4pm", "8pm"],
        datasets: [
          {
            data: props.data,
            fill: true,
            backgroundColor: props.fillColor,
            tension: 0.6,
            borderColor: props.lineColor,
            borderWidth: 1.5,
            pointBackgroundColor: props.color,
            pointRadius: 0,
          },
        ],
      }}
      options={{
        scales: {
          x: {
            display: false,
          },
          y: {
            display: false,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      }}
    />
  );
};

export default Summary;
