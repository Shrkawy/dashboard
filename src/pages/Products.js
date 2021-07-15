import { useContext, useEffect } from "react";
import DataGrid from "../compnoants/DataGrid";
import Loading from "../compnoants/UI/Loading";
import { AuthContext } from "../context";
import { useHttpClint } from "../hooks/send-request";
import Main from "../compnoants/Layout/Main";
import GridStateProvider from "../context/GridStateProvider";

const Products = () => {
  const { userId } = useContext(AuthContext);

  const { error, isLoading, resData, sendReuest } = useHttpClint();

  useEffect(() => {
    const getProducts = async () => {
      try {
        await sendReuest("get", `/${userId}/products`);
      } catch (err) {}
    };

    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <GridStateProvider>
      <Main title="All Products" error={error}>
        {isLoading && <Loading />}
        {resData && <DataGrid products rows={resData.data} />}
      </Main>
    </GridStateProvider>
  );
};

export default Products;
