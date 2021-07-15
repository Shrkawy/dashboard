import { AuthContext } from ".";
import { useAuth } from "../hooks/auth-hook";

export default function AuthStateProvider({ children }) {
  const { authData, login, logout } = useAuth();

  const authProviderValues = {
    isLoggedIn: !!authData?.token,
    token: authData?.token,
    userId: authData?.userId,
    username: authData?.username,
    store: authData?.store,
    login: login,
    logout: logout,
  };

  return (
    <AuthContext.Provider value={authProviderValues}>
      {children}
    </AuthContext.Provider>
  );
}
