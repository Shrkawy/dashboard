import { Avatar, Button, Typography } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";

export const productColumns = [
  {
    field: "productName",
    headerName: "Product Name",
    width: 250,
    renderCell: (params) => (
      <div style={productName}>
        <Avatar variant="rounded" src={params.row.images[0]} />
        <Typography variant="body2">{params.value}</Typography>
      </div>
    ),
  },
  {
    field: "category",
    headerName: "Category",
    width: 200,
  },
  {
    field: "price",
    headerName: "Price",
    width: 150,
    renderCell: (params) => `$ ${params.value}`,
  },
  {
    field: "stock",
    headerName: "Stock",
    width: 150,
    renderCell: (params) => params.value,
  },
  {
    field: "sold",
    headerName: "Sold",
    width: 150,
    renderCell: (params) => params.value || 0,
  },
  {
    field: "revenue",
    headerName: "Revenue",
    width: 160,
    renderCell: (params) => `$ ${params.row.price - params.row.originalPrice}`,
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 142,
    renderCell: (params) => (
      <div style={buttons}>
        <Button
          variant="text"
          color="primary"
          onClick={() => console.log(params)}
        >
          <Edit fontSize="small" />
        </Button>
        <Button
          variant="text"
          color="secondary"
          onClick={() => console.log(params.id)}
        >
          <Delete fontSize="small" />
        </Button>
      </div>
    ),
  },
];

const productName = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "flex-start",
  width: "100%",
  "& img": {
    width: 40,
    height: 40,
  },
  "& p": {
    marginLeft: 16,
  },
};

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
