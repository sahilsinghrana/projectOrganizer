import { Link, Redirect } from "react-router-dom";
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import Card from "../Components/Card";
import { useContext, useState } from "react";
import { useToast } from "@chakra-ui/toast";
import { auth, db } from "../firebase/config";
import { errorToast, successToast } from "../utils/toasts";
import globalContext from "../context/globalContext";

const Register = () => {
  const { user } = useContext(globalContext);
  const toast = useToast();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const register = () => {
    if (formData.password !== formData.confirmPassword)
      return errorToast(toast, "Passwords Do not Match");

    auth
      .createUserWithEmailAndPassword(formData.email, formData.password)
      .then((userCredential) => {
        let registeredUser = userCredential.user;
        registeredUser.updateProfile({
          displayName: formData.userName,
        });
        db.collection("users").doc(formData.email).set({
          name: registeredUser.displayName,
          uid: registeredUser.uid,
          email: registeredUser.email,
          photoUrl: registeredUser.photoURL,
          phoneNumber: registeredUser.phoneNumber,
        });
        successToast(toast, "User Registered ");
        // localStorage.setItem("user", userCredential.user);
      })
      .catch((err) => {
        errorToast(toast, err.message);
        console.log(err);
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
          <FormControl id="userName" isRequired>
            <FormLabel>Your Name</FormLabel>
            <Input placeholder="Name" onChange={handleChange} />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input type="email" onChange={handleChange} />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input type="password" onChange={handleChange} />
          </FormControl>

          <FormControl id="confirmPassword" isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <Input type="password" onChange={handleChange} />
          </FormControl>
          <div style={{ margin: "10px" }}>
            <Button
              colorScheme="teal"
              variant="solid"
              style={{ marginRight: "10px" }}
              onClick={register}
            >
              Register
            </Button>
            <Link to="/login"> Log In</Link>
          </div>
        </form>
      </Card>
    </>
  );
};

export default Register;
