import firebase from "firebase";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyCguKkLrsnkb85Fmu_v1UntspICA0ECKAY",
  authDomain: "authentication-d9677.firebaseapp.com",
  projectId: "authentication-d9677",
  storageBucket: "authentication-d9677.appspot.com",
  messagingSenderId: "283336552600",
  appId: "1:283336552600:web:6da8cdb624d8b61e2d20ed",
  measurementId: "G-Y2S4HN9DZE",
});

export const auth = app.auth()
export default app