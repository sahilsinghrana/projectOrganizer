import { useState } from "react";
import globalContext from "./globalContext";

const GlobalState = ({ children }) => {
  const [user, setUser] = useState();
  const [userLoading, setUserLoading] = useState(false);

  return (
    <globalContext.Provider
      value={{ user, setUser, userLoading, setUserLoading }}
    >
      {children}
    </globalContext.Provider>
  );
};

export default GlobalState;
