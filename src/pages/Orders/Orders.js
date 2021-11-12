import { useContext } from "react";
import { AuthContext } from "../../context";
import GridStateProvider from "../../context/GridStateProvider";
import Main from "../../components/Layout/Main";
import DataGrid from "../../components/DataGrid";
import { orderColumns } from "./ordersColumns";

const Orders = () => {
  const { userId } = useContext(AuthContext);
  return (
    <GridStateProvider>
      <Main title="All Orders" APIUrl={`/${userId}/orders`} orders>
        <DataGrid columns={orderColumns} />
      </Main>
    </GridStateProvider>
  );
};

export default Orders;
