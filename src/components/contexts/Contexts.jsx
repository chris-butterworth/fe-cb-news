import { useState, createContext, useEffect } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [usernameTest, setUsernameTest] = useState();

  useEffect(() => {
    const username = localStorage.getItem("username");
    const avatar_url = localStorage.getItem("userAvatar");
    setUser({ username, avatar_url });
  }, []);

  return (
    <Context.Provider value={{ user, setUser }}>{children}</Context.Provider>
  );
};
