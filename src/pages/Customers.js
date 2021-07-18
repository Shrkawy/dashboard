import { useContext } from "react";
import { AuthContext } from "../context";
import DataGrid from "../compnoants/DataGrid";
import Main from "../compnoants/Layout/Main";
import GridStateProvider from "../context/GridStateProvider";

const Customers = () => {
  const { userId } = useContext(AuthContext);
  return (
    <GridStateProvider>
      <Main title="All Customers" APIUrl={`/${userId}/customers`} customers>
        <DataGrid customers />
      </Main>
    </GridStateProvider>
  );
};

export default Customers;
