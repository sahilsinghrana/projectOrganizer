import { Text } from "@chakra-ui/layout";
import { useLocation } from "react-router";
import Login from "../Components/Authentication/Login";
import Register from "../Components/Authentication/Register";

const AuthenticationPage = () => {
  let { pathname } = useLocation();
  return (
    <div className="login-main">
      {/* <Progress value={80} /> */}
      <Text style={{ padding: "10px", color: "#0c4271" }} fontSize="3xl">
        {pathname === "/login" ? "Login" : "Register"}
      </Text>
      {pathname === "/login" ? <Login /> : <Register />}
    </div>
  );
};

export default AuthenticationPage;
