import { createContext } from 'react'
export const UserContext = createContext('')

/*
import { useState, createContext } from "react";
import { lightTheme, darkTheme } from "../themes";

export const ModeContext = createContext();

export const ModeProvider = ({ children }) => {
  const [mode, setMode] = useState(darkTheme);
  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      {children}
    </ModeContext.Provider>
  );
};
*/
