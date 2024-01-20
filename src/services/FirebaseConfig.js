import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// If needed: Import other items from Firebase:
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBSCQrAIvVRZvxo3IFtx7BlehIqVQ4VE3g",
  authDomain: "sportsstandins.firebaseapp.com",
  projectId: "sportsstandins",
  storageBucket: "sportsstandins.appspot.com",
  messagingSenderId: "484525024147",
  appId: "1:484525024147:web:a46d3b44ab12f84f9afe66",
  measurementId: "G-DZ7FHC6Q3V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore (database)
const db = getFirestore(app)

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth();
const provider = new GoogleAuthProvider();


export { app, db, auth, provider };