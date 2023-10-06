// export const UserContext = createContext('')

import { useState, createContext, useEffect } from "react";
// import { lightTheme, darkTheme } from '../../../themes'

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  // const [mode, setMode] = useState(lightTheme)

  useEffect(() => {
    setUser(localStorage.getItem("user"));
  }, []);
  return (
    <Context.Provider value={{ user, setUser }}>{children}</Context.Provider>
  );
};
