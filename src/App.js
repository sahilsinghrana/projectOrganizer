import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { useContext, useEffect, useState } from "react";
import globalContext from "./context/globalContext";
import Routes from "./Components/Routes";
import { auth } from "./firebase/config";
import { Skeleton } from "@chakra-ui/skeleton";

function App() {
  const { setUser } = useContext(globalContext);
  const [loading, setLoading] = useState(false);
  // console.log(indexedDB.open("firebaseLocalStorageDb", 1));
  useEffect(() => {
    setLoading(true);
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }
      setLoading(false);
    });
  }, []);

  if (loading)
    return (
      <Skeleton startColor="teal.500" endColor="teal.100" height="100vh" />
    );
  return (
    <div className="app">
      <Header />
      <Routes />
      <Footer />
    </div>
  );
}

export default App;
