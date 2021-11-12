import { Button } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import { convertStatusToIcon } from "../../utils/convert-status-icon";
import { convertToNormalDate } from "../../utils/convert-to-normal-date";

export const orderColumns = [
  {
    field: "createdAt",
    headerName: "Date",
    width: 140,
    renderCell: (params) => convertToNormalDate(params.value),
  },
  {
    field: "customer",
    headerName: "Customer Name",
    width: 250,
    renderCell: (params) =>
      params.value
        ? `${params.value.firstName} ${params.value.lastName}`
        : "not found",
  },
  {
    field: "finalPrice",
    headerName: "Price",
    width: 200,
    renderCell: (params) => `$ ${params.value}`,
  },
  {
    field: "status",
    headerName: "Status",
    width: 200,
    renderCell: (params) => convertStatusToIcon(params.value),
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 150,
    renderCell: () => (
      <div className={buttons}>
        <Button variant="text" color="primary">
          <Edit fontSize="small" />
        </Button>
        <Button variant="text" color="secondary">
          <Delete fontSize="small" />
        </Button>
      </div>
    ),
  },
];

const buttons = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  "& > *": {
    boxShadow: "none",
    padding: "5px",
    minWidth: "fit-content",
  },
};
