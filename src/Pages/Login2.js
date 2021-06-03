import { useEffect } from "react";
import { firebase } from "../firebase/config";
import "firebaseui/dist/firebaseui.css";

// import firebaseui from "firebaseui";
let firebaseui = require("firebaseui");
const Login2 = () => {
  useEffect(() => {
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start("#firebaseui-auth-container", {
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
      ],
      signInSuccessUrl: "http://localhost:3000/",
      tosUrl: "http://localhost:3000/",
    });
  }, []);
  return <div className="firebaseUI" id="firebaseui-auth-container"></div>;
};

export default Login2;
