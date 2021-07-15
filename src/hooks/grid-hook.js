import { useEffect, useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};

const initState = {
  showSelect: false,
  disableDeleteBtn: true,
  selection: { selectionModel: [] },
};

export function useGridContext() {
  const [gridState, dispatch] = useReducer(reducer, initState);

  useEffect(() => {
    if (gridState.selection.selectionModel.length > 0) {
      return dispatch({ type: "disableDeleteBtn", payload: false });
    } else {
      return dispatch({ type: "disableDeleteBtn", payload: true });
    }
  }, [gridState.selection.selectionModel.length]);

  return { gridState, dispatch };
}
