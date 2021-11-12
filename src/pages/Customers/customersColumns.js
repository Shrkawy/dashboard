import { Button } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import { convertToNormalDate } from "../../utils/convert-to-normal-date";

export const customersColumns = [
  {
    field: "spent",
    headerName: "Spent",
    width: 150,
    renderCell: (params) => `$ ${params.value}`,
  },
  {
    field: "name",
    headerName: "Name",
    width: 200,
    renderCell: (params) => `${params.row.firstName} ${params.row.lastName}`,
  },
  {
    field: "lastOrder",
    headerName: "Last Order",
    width: 180,
    renderCell: (params) => {
      if (!params.value) return "no orders";
      return convertToNormalDate(params.value);
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 240,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 160,
  },
  {
    field: "country",
    headerName: "Country",
    width: 150,
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 115,
    renderCell: () => (
      <div style={buttons}>
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
