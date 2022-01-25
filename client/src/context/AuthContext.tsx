import React from "react";
import { createContext, ReactChild, ReactChildren, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

type userType = {
  _id: number,
  username:string,
  followings: Array<number|undefined>,
  profilePicture:string
}

type dispatchType = {
  type:string,
  payload:any,
}

const user = localStorage.getItem("user");
interface ContextType {
  state: {
    user: userType;
    isFetching: boolean;
    error: boolean;
  };
  // eslint-disable-next-line no-empty-pattern
  dispatch: React.Dispatch<dispatchType>;
}
const INITIAL_STATE = {
  user:user ? JSON.parse(user) : null,
  isFetching: false,
  error: false
};

interface AuxProps {
  children: ReactChild | ReactChildren;
}
//export const AuthContext = createContext(INITIAL_STATE);
export const AuthContext = createContext<ContextType | null>(null);

export const AuthContextProvider = ({ children } : AuxProps ) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  
  useEffect(()=>{
    localStorage.setItem("user", JSON.stringify(state.user))
  },[state.user])

  return (
    <AuthContext.Provider
      value={{ state, dispatch }}
    >
      {children}
    </AuthContext.Provider>
  );
};
