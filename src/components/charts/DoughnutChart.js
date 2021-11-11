import React from "react";
import { useTheme } from "@material-ui/core";
import { Doughnut } from "react-chartjs-2";

const DoughnutChart = (props) => {
  const theme = useTheme();
  return (
    <Doughnut
      data={{
        labels: ["Deliverd", "Pending", "Canceled"],
        datasets: [
          {
            data: props.data,
            backgroundColor: [
              theme.palette.green.main,
              theme.palette.yellow.main,
              theme.palette.pink.main,
            ],
            hoverOffset: 4,
          },
        ],
      }}
      options={{
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
          },
        },
      }}
    />
  );
};

export default DoughnutChart;
