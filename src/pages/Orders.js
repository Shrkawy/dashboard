import { useContext, useEffect } from "react";
import { AuthContext } from "../context";
import { useHttpClint } from "../hooks/send-request";
import GridStateProvider from "../context/GridStateProvider";
import Main from "../compnoants/Layout/Main";
import DataGrid from "../compnoants/DataGrid";
import Loading from "../compnoants/UI/Loading";

const Orders = () => {
  const { userId } = useContext(AuthContext);
  const { error, isLoading, resData, sendReuest } = useHttpClint();

  useEffect(() => {
    const getOrders = async () => {
      try {
        await sendReuest("get", `/${userId}/orders`);
      } catch (err) {}
    };

    getOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <GridStateProvider>
      <Main
        title="All Orders"
        error={error}
        // handleMultiDelete={handleMultiDelete}
      >
        {isLoading && <Loading />}
        {!isLoading && resData && <DataGrid orders rows={resData.data} />}
      </Main>
    </GridStateProvider>
  );
};

export default Orders;
