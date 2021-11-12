import { Avatar, Button, makeStyles, Typography } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import { useGridActionButtons } from "../hooks/grid-hook2";
import { convertToNormalDate } from "./convert-to-normal-date";
import { convertStatusToIcon } from "./convert-status-icon";

const useStyles = makeStyles((theme) => ({
  btns: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    "& > *": {
      boxShadow: "none",
      padding: "5px",
      minWidth: "fit-content",
    },
  },
  productName: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    "& img": {
      width: theme.spacing(5),
      height: theme.spacing(5),
    },
    "& p": {
      marginLeft: theme.spacing(2),
    },
  },
}));

export const GetColumns = (orders, products, customers) => {
  const classes = useStyles();

  const { handleCellDelete, handleCellEdit } = useGridActionButtons("products");

  let columns = [];
  if (products) {
    const productColumns = [
      {
        field: "productName",
        headerName: "Product Name",
        width: 250,
        renderCell: (params) => (
          <div className={classes.productName}>
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
      },
      {
        field: "sold",
        headerName: "Sold",
        width: 150,
      },
      {
        field: "revenue",
        headerName: "Revenue",
        width: 160,
        renderCell: (params) =>
          `$ ${params.row.price - params.row.originalPrice}`,
      },
      {
        field: "actions",
        headerName: "Actions",
        width: 142,
        renderCell: (params) => (
          <div className={classes.btns}>
            <Button
              variant="text"
              color="primary"
              onClick={() => handleCellEdit(params)}
            >
              <Edit fontSize="small" />
            </Button>
            <Button
              variant="text"
              color="secondary"
              onClick={() => handleCellDelete(params.id)}
            >
              <Delete fontSize="small" />
            </Button>
          </div>
        ),
      },
    ];

    return (columns = productColumns);
  }

  if (orders) {
    const orderColumns = [
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
          `${params.value.firstName} ${params.value.lastName}`,
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
          <div className={classes.btns}>
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

    return (columns = orderColumns);
  }

  if (customers) {
    const customersColumns = [
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
        renderCell: (params) =>
          `${params.row.firstName} ${params.row.lastName}`,
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
          <div className={classes.btns}>
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
    return (columns = customersColumns);
  }

  return columns;
};
