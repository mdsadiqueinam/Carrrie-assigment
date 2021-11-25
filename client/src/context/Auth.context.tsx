import { useReducer, createContext, useContext } from "react";
import jwtDecode, { JwtPayload } from "jwt-decode";
const ACCESS_TOKEN = "access-token";

interface AuthorizationState {
  user: JwtPayload | null;
  login: (userData: { token: string }) => void;
  logout: () => void;
}

const initialState: AuthorizationState = { 
  user: null,
  login: (userData: any) => {},
  logout: () => {},
};

const token = localStorage.getItem(ACCESS_TOKEN);
if (token) {
  const decodedToken = jwtDecode<JwtPayload>(token);

  if (decodedToken.exp!! * 1000 < Date.now()) {
    localStorage.removeItem(ACCESS_TOKEN);
  } else {
    initialState.user = decodedToken;
  }
}

const AuthContext = createContext(initialState);

function authReducer(
  state: any,
  action: any
) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload.user,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

function AuthProvider(props: any) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (userData: any) => {
    const token = userData[ACCESS_TOKEN]
    localStorage.setItem(ACCESS_TOKEN, token);
    dispatch({
      type: "LOGIN",
      payload: { user: jwtDecode(token) },
    });
  };

  const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    dispatch({
      type: "LOGOUT"
    });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }} {...props} />
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}

export { AuthContext, AuthProvider, useAuth, ACCESS_TOKEN };
