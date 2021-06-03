import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDVWbOrTzQI1QfHO6QFX8HOV83ZgBScTSI",
  authDomain: "image-organizer-7df7c.firebaseapp.com",
  projectId: "image-organizer-7df7c",
  storageBucket: "image-organizer-7df7c.appspot.com",
  messagingSenderId: "951078265172",
  appId: "1:951078265172:web:38fac9edbda119ddfc28c1",
  measurementId: "G-P2X6C9462Q",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
// auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);

export { db, auth, firebase };
