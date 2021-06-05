import { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation,
} from "react-router-dom";
import globalContext from "../context/globalContext";
import AuthenticationPage from "../Pages/AuthenticationPage";
import HomePage from "../Pages/HomePage";
import ProjectDashboard from "../Pages/ProjectDashboard";

const Routes = () => {
  const { user } = useContext(globalContext);
  const location = useLocation();

  return (
    <>
      {/* {!user && location.pathname !== "/register" && <Redirect to="/login" />} */}
      <div className="body">
        <Switch>
          <Route path="/login" exact>
            <AuthenticationPage />
          </Route>
          <Route path="/register" exact>
            <AuthenticationPage />
          </Route>
          <Route path="/project/:projectId" exact>
            <ProjectDashboard />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </div>
    </>
  );
};

const Wrapper = () => (
  <Router>
    <Routes />
  </Router>
);

export default Wrapper;
