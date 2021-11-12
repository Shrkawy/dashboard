import { useCallback, useEffect, useReducer } from "react";
import { useHttpClint } from "./send-request";

const reducer = (state, action) => {
  switch (action.type) {
    case "gridAPIUrl":
      return {
        ...state,
        gridAPIUrl: action.payload,
      };
    case "gridIsLoading":
      return {
        ...state,
        gridIsLoading: action.payload,
      };
    case "rows":
      return {
        ...state,
        rows: action.payload,
      };
    case "rowsError":
      return {
        ...state,
        rowsError: action.payload,
      };
    case "showSelect":
      return {
        ...state,
        showSelect: !state.showSelect,
      };
    case "disableDeleteBtn": {
      return {
        ...state,
        disableDeleteBtn: action.payload,
      };
    }
    case "selection":
      return {
        ...state,
        selection: action.payload,
      };
    case "selectedItem":
      return {
        ...state,
        selectedItem: action.payload,
      };
    case "openDialog":
      return {
        ...state,
        openDialog: !state.openDialog,
      };
    case "dialogIsLoading":
      return {
        ...state,
        dialogIsLoading: action.payload,
      };
    case "dialogData":
      return {
        ...state,
        dialogData: action.payload,
      };
    case "deleteItem":
      return {
        ...state,
        deleteItem: action.payload,
      };
    case "snackbar":
      return {
        ...state,
        snackbar: {
          ...state.snackbar,
          open: action.payload.open,
          message: action.payload.message,
          type: action.payload.type,
        },
      };
    default:
      return state;
  }
};

const initState = {
  gridAPIUrl: null,
  gridIsLoading: false,
  rows: [],
  getRowsError: null,
  showSelect: false,
  disableDeleteBtn: true,
  selection: { selectionModel: [] },
  selectedItem: null,
  openDialog: false,
  dialogIsLoading: false,
  dialogData: null,
  deleteItem: false,
  snackbar: {
    open: false,
    message: "",
    type: "success",
  },
};

export function useGridContext() {
  const [gridState, dispatch] = useReducer(reducer, initState);
  const { error, sendRequest } = useHttpClint();

  const {
    gridAPIUrl,
    showSelect,
    selection,
    selectedItem,
    openDialog,
    deleteItem,
    snackbar,
  } = gridState;

  // get row items from DB
  const getItemsFromDB = useCallback(async () => {
    dispatch({ type: "gridIsLoading", payload: true });
    try {
      const res = await sendRequest("get", gridAPIUrl);
      if (error) {
        dispatch({ type: "rowsError", payload: error });
        dispatch({ type: "gridIsLoading", payload: false });
        return;
      }
      dispatch({ type: "rows", payload: res.data });
      dispatch({ type: "gridIsLoading", payload: false });
    } catch (err) {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gridAPIUrl]);

  // get single item from DB
  const getItemFromDB = useCallback(async () => {
    dispatch({ type: "dialogIsLoading", payload: true });
    try {
      const res = await sendRequest("get", `${gridAPIUrl}/${selectedItem}`);
      dispatch({ type: "dialogData", payload: res.data });
      dispatch({ type: "dialogIsLoading", payload: false });
      if (error) {
        console.error(error);
        return;
      }
    } catch (err) {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItem, openDialog]);

  // delete item from DB
  const deleteItemFromDB = useCallback(async () => {
    dispatch({ type: "dialogIsLoading", payload: true });
    await sendRequest("delete", `${gridAPIUrl}/${selectedItem}`);
    if (error) {
      dispatch({ type: "dialogIsLoading", payload: true });
      dispatch({ type: "deleteItem", payload: false });
      return;
    }
    dispatch({ type: "dialogIsLoading", payload: false });
    dispatch({ type: "openDialog" });
    dispatch({ type: "deleteItem", payload: false });
    dispatch({
      type: "snackbar",
      payload: { open: true, message: "deleted successfully", type: "success" },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteItem]);

  // get grid data when you enter the grid page
  useEffect(() => {
    if (gridState.rows.length === 0) {
      getItemsFromDB();
    } else return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gridAPIUrl, gridState.rows]);

  // handle select items
  useEffect(() => {
    if (selection.selectionModel.length > 0) {
      return dispatch({ type: "disableDeleteBtn", payload: false });
    } else {
      return dispatch({ type: "disableDeleteBtn", payload: true });
    }
  }, [selection.selectionModel.length]);

  // handle show select btn
  useEffect(() => {
    if (!showSelect)
      dispatch({ type: "selection", payload: { selectionModel: [] } });
  }, [showSelect]);

  // handle open dialog
  useEffect(() => {
    if (selectedItem && openDialog) {
      getItemFromDB();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItem, openDialog]);

  // handel delete item
  useEffect(() => {
    if (deleteItem) {
      deleteItemFromDB();
    } else return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteItem]);

  // handle edit item

  // handle delete multible items

  // handle close snackbar
  useEffect(() => {
    if (snackbar.open) {
      setTimeout(() => {
        dispatch({
          type: "snackbar",
          payload: { open: false },
        });
      }, 4000);
    }
  }, [snackbar.open]);

  return { gridState, dispatch };
}
