import { useState } from "react";
import globalContext from "./globalContext";

const GlobalState = ({ children }) => {
  const [user, setUser] = useState();

  return (
    <globalContext.Provider value={{ user, setUser }}>
      {children}
    </globalContext.Provider>
  );
};

export default GlobalState;
