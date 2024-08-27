// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQrSlWhbEv6MpSgAP4V2c3WW09EHfOZI0",
  authDomain: "jobtask-43023.firebaseapp.com",
  projectId: "jobtask-43023",
  storageBucket: "jobtask-43023.appspot.com",
  messagingSenderId: "464938046508",
  appId: "1:464938046508:web:e9b13b9c0adf92e3b8ad89"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

export default auth