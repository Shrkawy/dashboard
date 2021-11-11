import { useContext } from "react";
import { AuthContext } from "../context";
import DataGrid from "../components/DataGrid";
import Main from "../components/Layout/Main";
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
