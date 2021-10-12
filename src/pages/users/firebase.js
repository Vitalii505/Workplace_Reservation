import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB9z3tIgonyr2ljqOfnSVYsAhuKg-Pb8ok",
  authDomain: "sky-workplace.firebaseapp.com",
  databaseURL: "https://sky-workplace-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "sky-workplace",
  storageBucket: "sky-workplace.appspot.com",
  messagingSenderId: "958347088374",
  appId: "1:958347088374:web:8da0f2a497a4cb6b94b7d7"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
