// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
    apiKey: "AIzaSyDJ4nW9oSxBD47yM2h8gxVbVfrS4R3jkmA",
    authDomain: "zelmifon.firebaseapp.com",
    projectId: "zelmifon",
    storageBucket: "zelmifon.appspot.com",
    messagingSenderId: "450622776396",
    appId: "1:450622776396:web:8f649d19d50c46f19000e9",
    measurementId: "G-04E7CDL00K"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Firestore instance

export { auth,db };
