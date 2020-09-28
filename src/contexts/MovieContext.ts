import { createContext } from "react";
import { State } from "../types";

const MovieContext = createContext<{
  state: State;
  dispatch: React.Dispatch<any>;
}>({ state: { isLoading: false, filtersApplied: {
    genre: [],
    year: [],
  } }, dispatch: () => null });

export default MovieContext;
