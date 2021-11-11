import { Grid, makeStyles, Typography, useTheme } from "@material-ui/core";
import Charts from "../components/charts/Charts";
import SummaryChart from "../components/SummaryChart";
import List from "../components/UI/List";
import ChartsData from "../data/ChartsData";
import ProductsData from "../data/ProductsData";
import Paper from "../components/UI/Paper";
// import ShowOnlyTable from "../components/RecentOrders";
// import OrdersData from "../data/OrdersData";

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: "hidden",
  },
}));

const Dashboard = () => {
  const theme = useTheme();
  const classes = useStyles();
  return (
    <Grid
      component="section"
      container
      spacing={theme.spacing(0.5)}
      className={classes.root}
    >
      <Grid item xs={12} md={6} lg={3}>
        <SummaryChart
          data={ChartsData.TodayRevenue}
          title="Today Revenue"
          price="$8.521"
          lineColor={theme.palette.green.main}
          fillColor={theme.palette.green.light}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <SummaryChart
          data={ChartsData.TodayOrders}
          title="Today Order"
          price="129"
          lineColor={theme.palette.yellow.main}
          fillColor={theme.palette.yellow.light}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <SummaryChart
          data={ChartsData.TotalProducts}
          title="Total Products"
          price="72"
          lineColor={theme.palette.pink.main}
          fillColor={theme.palette.pink.light}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <SummaryChart
          data={ChartsData.TodayVisitors}
          title="Total Visitors"
          price="15,752"
          lineColor={theme.palette.burble.main}
          fillColor={theme.palette.burble.light}
        />
      </Grid>
      <Grid item xs={12} md={12} lg={8}>
        <Paper>
          <Typography variant="h6">Revenue</Typography>
          <Charts.LineChart data={ChartsData.Revenue} />
        </Paper>
      </Grid>
      <Grid item s={12} md={12} lg={4}>
        <List title="Top Products" data={ProductsData} href="/products" />
      </Grid>
      <Grid item xs={12} md={12} lg={4}>
        <Paper>
          <Typography variant="h6" paragraph>
            Product Status
          </Typography>
          <Charts.DoughnutChart data={ChartsData.productStatus} />
        </Paper>
      </Grid>
      {/* <Grid item xs={12} md={12} lg={8}>
        <ShowOnlyTable href="/orders" rows={5} title="Recent Orders" data={OrdersData} />
      </Grid> */}
    </Grid>
  );
};

export default Dashboard;
