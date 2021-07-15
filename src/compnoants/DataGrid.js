import { useContext } from "react";
import { DataGrid as MuiDataGrid, GridToolbar } from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/core";
import { useGetRowsAndColums } from "../hooks/get-columns";
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

export default function DataGrid(props) {
  const classes = useStyles();
  const { gridState, dispatch } = useContext(GridContext);

  const { orders, products, customers, rows } = props;

  const columns = useGetRowsAndColums(orders, products, customers);

  const handleRowClick = (params) => {
    const { id } = params;
    const selectRow = params.api.selectRow;
    const isSelected = Boolean(params.api.state.selection[id]);

    // if in select mode -> select row.
    if (gridState.showSelect) {
      if (isSelected) {
        return selectRow(id, false);
      }
      return selectRow(id, true);
    }

    // if not in select mode -> open details
    alert(params.id);
  };

  return (
    <MuiDataGrid
      className={classes.root}
      rows={rows}
      columns={columns}
      autoPageSize
      checkboxSelection={gridState.showSelect}
      disableSelectionOnClick
      onRowClick={handleRowClick}
      onSelectionModelChange={(selection) =>
        dispatch({ type: "selection", payload: selection })
      }
      components={{
        Toolbar: GridToolbar,
      }}
      {...props}
    />
  );
}
