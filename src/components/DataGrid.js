import { useContext } from "react";
import PropTypes from "prop-types";
import { DataGrid as MuiDataGrid, GridToolbar } from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/core";
import { useGetColums } from "../utils/get-columns";
import { GridContext } from "../context";

function customCheckbox(theme) {
  return {
    "& .MuiCheckbox-root svg": {
      "&::-webkit-scrollbar": {
        width: "0.4em",
        borderRadius: theme.shape.borderRadius,
      },
      "&::-webkit-scrollbar-track": {
        boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
        webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "rgba(0,0,0,.1)",
        outline: "1px solid slategrey",
      },
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
    maxWidth: "80vw",
    minHeight: "67vh",
    border: 0,
    "& .MuiDataGrid-cell:focus": {
      outline: "none",
    },
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
    "& .MuiDataGrid-row": {
      cursor: "pointer",
    },
    ...customCheckbox(theme),
  },
}));

function DataGrid({ orders, products, customers }) {
  const classes = useStyles();

  const { gridState, dispatch } = useContext(GridContext);
  const { selection, showSelect, rows } = gridState;

  const columns = useGetColums(orders, products, customers);

  const handleRowClick = async (params) => {
    const { id } = params;

    // if in select mode -> select row.
    if (showSelect) return;

    // if not in select mode -> open details
    dispatch({ type: "selectedItem", payload: id });
    dispatch({ type: "openDialog" });
  };

  const handleOnSelectionModelChange = (selection) => {
    dispatch({ type: "selection", payload: selection });
  };

  return (
    rows.length > 0 && (
      <MuiDataGrid
        className={classes.root}
        rows={rows}
        columns={columns}
        autoPageSize
        checkboxSelection={showSelect}
        disableSelectionOnClick={!showSelect}
        selectionModel={selection.selectionModel}
        onRowClick={handleRowClick}
        onSelectionModelChange={handleOnSelectionModelChange}
        scrollbarSize={1}
        components={{
          Toolbar: GridToolbar,
        }}
      />
    )
  );
}

DataGrid.propTypes = {
  products: PropTypes.bool,
  orders: PropTypes.bool,
  customers: PropTypes.bool,
};

export default DataGrid;
