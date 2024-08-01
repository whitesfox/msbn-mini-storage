// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAin5A2muzB-8KSdB03FGZ0umbEcpe3Idk",
  authDomain: "my-project-67671-1668668484721.firebaseapp.com",
  databaseURL:
    "https://my-project-67671-1668668484721-default-rtdb.firebaseio.com",
  projectId: "my-project-67671-1668668484721",
  storageBucket: "my-project-67671-1668668484721.appspot.com",
  messagingSenderId: "601644222146",
  appId: "1:601644222146:web:a86826397aa3a9f6595d5b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
