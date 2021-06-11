import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Routes from "./routes/Routes";
import { AuthProvider } from "./Auth";

function App() {
  return (
    <div className="app">
      <AuthProvider>
        <Header />
        <div className="body">
          <Routes />
        </div>
        <Footer />
      </AuthProvider>
    </div>
  );
}

export default App;
