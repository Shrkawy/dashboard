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
    case "openDialog":
      return {
        ...state,
        openDialog: !state.openDialog,
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
  gridIsLoading: true,
  rows: [],
  getRowsError: null,
  showSelect: false,
  disableDeleteBtn: true,
  selection: { selectionModel: [] },
  openDialog: false,
  dialogData: null,
};

export function useGridContext() {
  const [gridState, dispatch] = useReducer(reducer, initState);
  const { isLoading, error, sendReuest } = useHttpClint();

  useEffect(() => {
    const getItemsFromDB = async () => {
      try {
        const res = await sendReuest("get", gridState.gridAPIUrl);
        console.log(res);
        dispatch({ type: "rows", payload: res.data });
      } catch (err) {}
    };

    getItemsFromDB();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gridState.gridAPIUrl]);

  useEffect(() => {
    dispatch({ type: "rowsError", payload: error });
  }, [error]);

  useEffect(() => {
    dispatch({ type: "gridIsLoading", payload: isLoading });
  }, [isLoading]);

  useEffect(() => {
    if (gridState.selection.selectionModel.length > 0) {
      return dispatch({ type: "disableDeleteBtn", payload: false });
    } else {
      return dispatch({ type: "disableDeleteBtn", payload: true });
    }
  }, [gridState.selection.selectionModel.length]);

  useEffect(() => {
    if (!gridState.showSelect)
      dispatch({ type: "selection", payload: { selectionModel: [] } });
  }, [gridState.showSelect]);

  // useEffect(() => {
  //   if (gridState.openDialog) {
  //     const get
  //   }
  // }, [gridState.openDialog]);

  return { gridState, dispatch };
}
