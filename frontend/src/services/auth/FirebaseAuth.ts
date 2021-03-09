import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBcbj0nZfpR9vfz7XtCxTNWFASsF3mSfeY",
  authDomain: "inventory-of-equipment.firebaseapp.com",
  databaseURL: "https://inventory-of-equipment.firebaseio.com",
  projectId: "inventory-of-equipment",
  storageBucket: "inventory-of-equipment.appspot.com",
  messagingSenderId: "794250180062",
  appId: "1:794250180062:web:276b365a117123ac4e194f",
};

const app = firebase.initializeApp(firebaseConfig);

console.log(firebase.apps);

export const auth = app.auth();
