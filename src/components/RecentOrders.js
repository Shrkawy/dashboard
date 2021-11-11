import {
  Button,
  Grid,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import Paper from "./UI/Paper";
import Status from "./UI/Status";

const convertToNormalDate = (date) => {
  const newDate = new Date(date);
  const year = newDate.getFullYear();
  let month = newDate.getMonth() + 1;
  let dt = newDate.getDate();

  if (dt < 10) {
    dt = "0" + dt;
  }
  if (month < 10) {
    month = "0" + month;
  }
  return `${dt}/${month}/${year}`;
};

const convertStatusToIcon = (status) => {
  let statusIcon;

  switch (status) {
    case "Canceled":
      return (statusIcon = <Status label="Canceled" canceled />);
    case "Pending":
      return (statusIcon = <Status label="Pending" pending />);
    case "Deliverd":
      return (statusIcon = <Status label="Deliverd" deliverd />);
    default:
      status = <Status label="..." />;
  }

  return statusIcon;
};

const useStyles = makeStyles((theme) => ({
  table: {
    overflow: "scroll",
  },
  tableRow: {
    backgroundColor: theme.palette.primary.main,
    "& .MuiTableCell-head": {
      color: "#fff",
    },
  },
}));

const RecentOrders = (props) => {
  const classes = useStyles();

  return (
    <Paper>
      <Grid container>
        {props.title && (
          <>
            <Grid item>
              <Typography variant="h6">{props.title}</Typography>
            </Grid>
            <Grid item xs></Grid>
            <Grid item>
              <Button component={Link} to={props.href} variant="text">
                See All
              </Button>
            </Grid>
          </>
        )}
        <Grid item xs={12}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow className={classes.tableRow}>
                <TableCell>#Order No.</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.data.slice(0, props.rows).map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{convertToNormalDate(item.date)}</TableCell>
                  <TableCell>{item.customerName}</TableCell>
                  <TableCell>{`$${item.price}`}</TableCell>
                  <TableCell>{convertStatusToIcon(item.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default RecentOrders;
