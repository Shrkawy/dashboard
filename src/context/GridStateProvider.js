import { GridContext } from ".";
import { useGridContext } from "../hooks/grid-hook";

export default function GridStateProvider({ children }) {
  const { gridState, dispatch } = useGridContext();

  return (
    <GridContext.Provider value={{ gridState, dispatch }}>
      {children}
    </GridContext.Provider>
  );
}
