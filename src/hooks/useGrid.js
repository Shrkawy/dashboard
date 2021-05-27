import React, { useEffect, useState } from "react";
import { Button, makeStyles } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import Status from "../compnoants/UI/Status";

const convertToNormalDate = (date) => {
  const newDate = new Date(date);
  const year = newDate.getFullYear();
  let month = newDate.getMonth() + 1;
  let dt = newDate.getDate();

  if (dt < 10) {
    dt = "0" + dt;
  }
  if (month < 10) {
    month = "0" + month;
  }
  return `${dt}/${month}/${year}`;
};

const convertStatusToIcon = (status) => {
  let statusIcon;

  switch (status) {
    case "Canceled":
      return (statusIcon = <Status label="Canceled" canceled />);
    case "Pending":
      return (statusIcon = <Status label="Pending" pending />);
    case "Deliverd":
      return (statusIcon = <Status label="Deliverd" deliverd />);
    default:
      status = <Status label="..." />;
  }

  return statusIcon;
};

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
}));

export const useGrid = (orders, products, customers, rows) => {
  const classes = useStyles();
  const productColumns = [
    { field: "productName", headerName: "Product Name", width: 250 },
    {
      field: "category",
      headerName: "Category",
      width: 150,
    },
    {
      field: "price",
      headerName: "Price",
      width: 100,
      renderCell: (params) => `$ ${params.value}`,
    },
    {
      field: "stock",
      headerName: "Stock",
      width: 100,
    },
    {
      field: "sold",
      headerName: "Sold",
      width: 100,
    },
    {
      field: "revenue",
      headerName: "Revenue",
      width: 140,
      renderCell: (params) => `$ ${params.value}`,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
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

  const orderColumns = [
    {
      field: "id",
      headerName: "ID",
      width: 120,
      renderCell: (params) => `#${params.value}`,
    },
    {
      field: "date",
      headerName: "Date",
      width: 140,
      renderCell: (params) => convertToNormalDate(params.value),
    },
    { field: "customerName", headerName: "Customer Name", width: 190 },
    { field: "products", headerName: "Products", width: 150 },
    {
      field: "price",
      headerName: "Price",
      width: 100,
      renderCell: (params) => `$ ${params.value}`,
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => convertStatusToIcon(params.value),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
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

  const customersColumns = [
    {
      field: "id",
      headerName: "ID",
      width: 80,
      renderCell: (params) => `#${params.value}`,
    },
    {
      field: "spent",
      headerName: "Spent",
      width: 110,
      renderCell: (params) => `$${params.value}`,
    },
    { field: "customerName", headerName: "Customer Name", width: 190 },
    {
      field: "lastOrder",
      headerName: "Last Order",
      width: 150,
      renderCell: (params) => convertToNormalDate(params.value),
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
      width: 120,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 125,
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

  const columns = orders
    ? orderColumns
    : products
    ? productColumns
    : customers
    ? customersColumns
    : [];

  return { columns, rows };
};

export const useLogicGrid = (collection) => {
  const [showSelect, setShowSelect] = useState(false);
  const [disableDeleteBtn, setDisableDeleteBtn] = useState();

  useEffect(() => {
    if (collection.selectionModel.length > 1) {
      return setDisableDeleteBtn(false);
    } else {
      return setDisableDeleteBtn(true);
    }
  }, [collection.selectionModel.length]);

  const handleShowSelection = () => setShowSelect(!showSelect);

  const handleMultiDelete = () => {
    console.log(`Delete this ${collection.selectionModel}`);
  };

  return [showSelect, handleShowSelection, disableDeleteBtn, handleMultiDelete];
};
