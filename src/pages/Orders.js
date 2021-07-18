import { useContext } from "react";
import { AuthContext } from "../context";
import GridStateProvider from "../context/GridStateProvider";
import Main from "../compnoants/Layout/Main";
import DataGrid from "../compnoants/DataGrid";

const Orders = () => {
  const { userId } = useContext(AuthContext);
  return (
    <GridStateProvider>
      <Main
        title="All Orders"
        APIUrl={`/${userId}/orders`}
        orders
        // handleMultiDelete={handleMultiDelete}
      >
        <DataGrid orders />
      </Main>
    </GridStateProvider>
  );
};

export default Orders;
