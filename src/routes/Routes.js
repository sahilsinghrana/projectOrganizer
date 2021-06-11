import { BrowserRouter as Router, Route } from "react-router-dom";
import AuthenticationPage from "../Pages/AuthenticationPage";
import HomePage from "../Pages/HomePage";
import ProjectDashboard from "../Pages/ProjectDashboard";
import PrivateRoute from "./PrivateRoute";

const Routes = () => {
  return (
    <>
      {" "}
      <PrivateRoute
        exact
        path="/project/:projectId"
        component={ProjectDashboard}
      />
      <PrivateRoute
        exact
        path="/project/:projectId/:statusName"
        component={ProjectDashboard}
      />
      <PrivateRoute exact path="/" component={HomePage} />
      <Route exact path="/login" component={AuthenticationPage} />
      <Route exact path="/register" component={AuthenticationPage} />
    </>
  );
};

const Wrapper = () => (
  <Router>
    <Routes />
  </Router>
);

export default Wrapper;
