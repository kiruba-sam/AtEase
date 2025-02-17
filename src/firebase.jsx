import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCz_EnSQjJU6JCgez4h0SqMZFbC_4mlLc4",
  authDomain: "atease-a8b29.firebaseapp.com",
  projectId: "atease-a8b29",
  storageBucket: "atease-a8b29.appspot.com",
  messagingSenderId: "1021773618290",
  appId: "1:1021773618290:web:dfba0c73c565ae8968b6eb",
  measurementId: "G-600NYDW2WL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Ensure auth is ready
export { app, auth, provider };
