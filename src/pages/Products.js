import { useContext } from "react";
import DataGrid from "../compnoants/DataGrid";
import { AuthContext } from "../context";
import Main from "../compnoants/Layout/Main";
import GridStateProvider from "../context/GridStateProvider";

const Products = () => {
  const { userId } = useContext(AuthContext);
  return (
    <GridStateProvider>
      <Main title="All Products" APIUrl={`/${userId}/products`} products>
        <DataGrid products />
      </Main>
    </GridStateProvider>
  );
};

export default Products;
