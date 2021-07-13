import React, { useEffect, useState } from "react";
import { Avatar, Button, makeStyles, Typography } from "@material-ui/core";
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

function handleCellDelete(params) {
  console.log(params);
}

function handleCellEdit(params) {
  console.log(params);
}

export const useGrid = (orders, products, customers, rows) => {
  const classes = useStyles();
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
              onClick={() => handleCellDelete(params)}
            >
              <Delete fontSize="small" />
            </Button>
          </div>
        ),
      },
    ];

    return { columns: productColumns, rows };
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

    return { columns: orderColumns, rows };
  }

  if (customers) {
    const customersColumns = [
      {
        field: "spent",
        headerName: "Spent",
        width: 150,
        renderCell: (params) => `$${params.value}`,
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
    return { columns: customersColumns, rows };
  }

  return { columns: [], rows: [] };
};

export const useLogicGrid = (collection) => {
  const [showSelect, setShowSelect] = useState(false);
  const [disableDeleteBtn, setDisableDeleteBtn] = useState();

  useEffect(() => {
    if (collection.selectionModel.length > 0) {
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