import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context";
import { useHttpClint } from "../hooks/send-request";
import DataGrid from "../compnoants/DataGrid";
import Loading from "../compnoants/UI/Loading";
import Main from "../compnoants/Layout/Main";
import GridStateProvider from "../context/GridStateProvider";

const Customers = () => {
  const { userId } = useContext(AuthContext);

  const { error, isLoading, resData, sendReuest } = useHttpClint();

  useEffect(() => {
    const getCustomers = async () => {
      try {
        await sendReuest("get", `/${userId}/customers`);
      } catch (err) {}
    };

    getCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <GridStateProvider>
      <Main title="All Customers" error={error}>
        {isLoading && <Loading />}
        {resData && <DataGrid customers rows={resData.data} />}
      </Main>
    </GridStateProvider>
  );
};

export default Customers;
