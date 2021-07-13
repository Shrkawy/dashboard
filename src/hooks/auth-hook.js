import { useCallback, useEffect, useState } from "react";

export const useAuth = () => {
  const [authData, setAuthData] = useState(null);

  /**
   * run everytime you open the application
   * @param {string} userId
   * @param {string} token
   * @param {Date} expiresIn
   *
   */
  const login = useCallback((userId, token, store, username, expiresIn) => {
    const now = new Date();
    const expirationDate =
      expiresIn || new Date(now.getTime() + 1000 * 60 * 60 * 24 * 14);
    setAuthData({
      token,
      userId,
      expirationDate,
      store,
      username,
    });

    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId,
        token,
        expiresIn: expirationDate,
        store,
        username,
      })
    );
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("userData");
    return setAuthData(null);
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));

    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiresIn) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        storedData.store,
        storedData.username,
        storedData.expiresIn
      );
    } else {
      logout();
    }
  }, [login, logout]);

  return { login, logout, authData };
};
