import { useEffect, useReducer } from "react";
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
};

export function useGridContext() {
  const [gridState, dispatch] = useReducer(reducer, initState);
  const { error, sendReuest } = useHttpClint();

  const { gridAPIUrl, showSelect, selection, selectedItem, openDialog } =
    gridState;

  // get grid data when you enter the grid page
  useEffect(() => {
    dispatch({ type: "gridIsLoading", payload: true });
    if (gridState.rows.length === 0) {
      const getItemsFromDB = async () => {
        try {
          const res = await sendReuest("get", gridAPIUrl);
          dispatch({ type: "rows", payload: res.data });
          dispatch({ type: "gridIsLoading", payload: false });
        } catch (err) {}
      };

      getItemsFromDB();
    } else return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gridAPIUrl]);

  // show error if fetch faild
  useEffect(() => {
    dispatch({ type: "rowsError", payload: error });
  }, [error]);

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
      const getItemsFromDB = async () => {
        dispatch({ type: "dialogIsLoading", payload: true });
        try {
          const res = await sendReuest("get", `${gridAPIUrl}/${selectedItem}`);
          dispatch({ type: "dialogData", payload: res.data });
          dispatch({ type: "dialogIsLoading", payload: false });
          if (error) {
            console.log(error);
            return;
          }
        } catch (err) {}
      };
      getItemsFromDB();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItem, openDialog]);

  return { gridState, dispatch };
}
