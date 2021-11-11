import { useContext } from "react";
import { AuthContext } from "../context";
import { useHttpClint } from "./send-request";

export const useGridActionButtons = (GridDataType) => {
  const { error, isLoading, sendRequest } = useHttpClint();
  const { userId } = useContext(AuthContext);

  const handleCellDelete = async (itemId, customerId) => {
    if (isLoading) return;
    try {
      const res = await sendRequest(
        "DELETE",
        `/${userId}${
          customerId ? `/${customerId}` : ""
        }/${GridDataType}/${itemId}`
      );

      console.log(res);

      if (res.success) {
        return console.log("deleted");
      } else return console.log(error);
    } catch (err) {
      return console.log(err);
    }
  };

  const handleCellEdit = (params) => {
    console.log(params);
  };

  return { handleCellDelete, handleCellEdit };
};
