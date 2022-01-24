import { createContext, ReactChild, ReactChildren, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const user = localStorage.getItem("user");
const INITIAL_STATE = {
  user:user ? JSON.parse(user) : null,
  isFetching: false,
  error: false,
};

interface AuxProps {
  children: ReactChild | ReactChildren;
}
export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children } : AuxProps ) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  
  useEffect(()=>{
    localStorage.setItem("user", JSON.stringify(state.user))
  },[state.user])
  
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
