import { useContext } from "react";
import { AuthContext } from "../../context";
import DataGrid from "../../components/DataGrid";
import Main from "../../components/Layout/Main";
import GridStateProvider from "../../context/GridStateProvider";
import { customersColumns } from "./customersColumns";

const Customers = () => {
  const { userId } = useContext(AuthContext);
  return (
    <GridStateProvider>
      <Main title="All Customers" APIUrl={`/${userId}/customers`} customers>
        <DataGrid columns={customersColumns} />
      </Main>
    </GridStateProvider>
  );
};

export default Customers;
