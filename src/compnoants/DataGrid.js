import React from "react";
import { DataGrid as MuiDataGrid, GridToolbar } from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/core";
import { useGrid } from "../hooks/useGrid";

function customCheckbox(theme) {
  return {
    "& .MuiCheckbox-root svg": {
      width: 16,
      height: 16,
      backgroundColor: "transparent",
      border: `1px solid ${
        theme.palette.type === "light" ? "#d9d9d9" : "rgb(67, 67, 67)"
      }`,
      borderRadius: 2,
    },
    "& .MuiCheckbox-root svg path": {
      display: "none",
    },
    "& .MuiCheckbox-root.Mui-checked:not(.MuiCheckbox-indeterminate) svg": {
      backgroundColor: "#1890ff",
      borderColor: "#1890ff",
    },
    "& .MuiCheckbox-root.Mui-checked .MuiIconButton-label:after": {
      position: "absolute",
      display: "table",
      border: "2px solid #fff",
      borderTop: 0,
      borderLeft: 0,
      transform: "rotate(45deg) translate(-50%,-50%)",
      opacity: 1,
      transition: "all .2s cubic-bezier(.12,.4,.29,1.46) .1s",
      content: '""',
      top: "50%",
      left: "39%",
      width: 5.71428571,
      height: 9.14285714,
    },
    "& .MuiCheckbox-root.MuiCheckbox-indeterminate .MuiIconButton-label:after":
      {
        width: 8,
        height: 8,
        backgroundColor: "#1890ff",
        transform: "none",
        top: "39%",
        border: 0,
      },
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    border: 0,
    color:
      theme.palette.type === "light"
        ? "rgba(0,0,0,.85)"
        : "rgba(255,255,255,0.85)",
    WebkitFontSmoothing: "auto",
    letterSpacing: "normal",
    "& .MuiDataGrid-columnsContainer": {
      backgroundColor:
        theme.palette.type === "light" ? theme.palette.primary.main : "#1d1d1d",
      color: "#fff",
    },
    "& .MuiDataGrid-iconSeparator": {
      display: "none",
    },
    "& .MuiDataGrid-colCell, .MuiDataGrid-cell": {
      borderRight: `1px solid ${
        theme.palette.type === "light" ? theme.palette.primary.light : "#303030"
      }`,
    },
    "& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell": {
      borderBottom: `1px solid ${
        theme.palette.type === "light" ? theme.palette.primary.light : "#303030"
      }`,
    },
    "& .MuiDataGrid-cell": {
      color:
        theme.palette.type === "light"
          ? theme.palette.text.primary
          : "rgba(255,255,255,0.65)",
    },
    "& .MuiPaginationItem-root": {
      borderRadius: 0,
    },
    "& .MuiDataGrid-columnsContainer .MuiIconButton-label": {
      color: "#fff",
    },
    ...customCheckbox(theme),
  },
}));

const DataGrid = (props) => {
  const classes = useStyles();
  const { orders, products, customers, data, select } = props;
  const { columns, rows } = useGrid(orders, products, customers, data);

  return (
    <MuiDataGrid
      className={classes.root}
      rows={rows}
      columns={columns}
      checkboxSelection={select ? true : false}
      autoPageSize
      disableSelectionOnClick
      components={{
        Toolbar: GridToolbar,
      }}
      {...props}
    />
  );
};

export default DataGrid;
