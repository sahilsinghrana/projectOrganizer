import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { useContext } from "react";
import globalContext from "./context/globalContext";
import Routes from "./Components/Routes";
import { auth } from "./firebase/config";

function App() {
  const { message } = useContext(globalContext);
  console.log(auth.currentUser);
  console.log(message);
  return (
    <div className="app">
      <Header />
      <Routes />
      <Footer />
    </div>
  );
}

export default App;
