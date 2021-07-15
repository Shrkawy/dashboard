import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  store: null,
  username: null,
  token: null,
  login: () => {},
  logout: () => {},
});

export const GridContext = createContext({
  gridState: null,
  dispatch: null,
});
