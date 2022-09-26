// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCREA25TB36seUA6vjyPiD0-RBW0ak0mZE",
  authDomain: "api-de-peliculas.firebaseapp.com",
  projectId: "api-de-peliculas",
  storageBucket: "api-de-peliculas.appspot.com",
  messagingSenderId: "150497950596",
  appId: "1:150497950596:web:725633c8d272bd35d37bd1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;