import { useTheme } from "@material-ui/core";
import React from "react";
import { Line } from "react-chartjs-2";

const LineChart = (props) => {
  const theme = useTheme();
  return (
    <Line
      {...props}
      data={{
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "June",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Des",
        ],
        datasets: [
          {
            label: "This Year",
            data: props.data.thisYear,
            borderColor: theme.palette.green.main,
            backgroundColor: theme.palette.green.light,
            fill: false,
          },
          {
            label: "Last Year",
            data: props.data.lastYear,
            borderColor: theme.palette.yellow.main,
            backgroundColor: theme.palette.yellow.light,
            fill: false,
          },
        ],
      }}
    />
  );
};

export default LineChart;
