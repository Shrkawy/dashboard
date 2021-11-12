import { useContext } from "react";
import DataGrid from "../../components/DataGrid";
import { AuthContext } from "../../context";
import Main from "../../components/Layout/Main";
import GridStateProvider from "../../context/GridStateProvider";
import { productColumns } from "./productsColumns";

const Products = () => {
  const { userId } = useContext(AuthContext);
  return (
    <GridStateProvider>
      <Main title="All Products" APIUrl={`/${userId}/products`} products>
        <DataGrid columns={productColumns} />
      </Main>
    </GridStateProvider>
  );
};

export default Products;
