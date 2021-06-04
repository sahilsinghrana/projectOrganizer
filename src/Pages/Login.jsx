import { Link, Redirect } from "react-router-dom";
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import Card from "../Components/Card";
import { useContext, useState } from "react";
import { auth } from "../firebase/config";
import globalContext from "../context/globalContext";
import Loader from "../Components/Loader";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/alert";

const Login = () => {
  const { user, setUser } = useContext(globalContext);
  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    auth
      .signInWithEmailAndPassword(formData.email, formData.password)
      .then((response) => {
        setLoading(false);
        setUser(response);
        console.log(response);
        setErrorMessage();
      })
      .catch((err) => {
        setLoading(false);
        setErrorMessage(err);
        console.log(err);
        setTimeout(() => {
          setErrorMessage();
        }, 15000);
      });
  };

  if (user) return <Redirect to="/" />;
  return (
    <>
      <Card
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <form>
          {loading && <Loader />}

          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input type="email" onChange={handleChange} />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input type="password" onChange={handleChange} />
          </FormControl>
          <div style={{ margin: "10px" }}>
            {" "}
            <Button
              colorScheme="teal"
              variant="solid"
              style={{ marginRight: "10px" }}
              type="submit"
              onClick={handleSubmit}
              disabled={loading}
            >
              {!loading ? "Sign In" : "Please Wait"}
            </Button>
            <Link to="/register"> Register</Link>
          </div>
        </form>
        {errorMessage && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle mr={2} color="red">
              Error!
            </AlertTitle>
            <AlertDescription
              style={{ wordWrap: "break-word", width: "100%", color: "teal" }}
            >
              {errorMessage.message}
            </AlertDescription>
          </Alert>
        )}
      </Card>
    </>
  );
};

export default Login;
