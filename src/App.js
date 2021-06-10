import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { useContext, useEffect, useState } from "react";
import globalContext from "./context/globalContext";
import Routes from "./Components/Routes";
import { auth } from "./firebase/config";
import { Skeleton } from "@chakra-ui/skeleton";
import { AuthProvider } from "./Auth";

function App() {
  const { user, setUser } = useContext(globalContext);
  const [loading, setLoading] = useState(false);
  // console.log(indexedDB.open("firebaseLocalStorageDb", 1));
  useEffect(() => {
    auth.onAuthStateChanged((usr) => {
      setLoading(true);
      if (usr) {
        setUser(usr);
      }
      setLoading(false);
    });
  }, [user]);

  if (loading)
    return (
      <Skeleton startColor="teal.500" endColor="teal.100" height="100vh" />
    );
  return (
    <div className="app">
      <Header />
      <AuthProvider>
        <Routes />
      </AuthProvider>
      <Footer />
    </div>
  );
}

export default App;
