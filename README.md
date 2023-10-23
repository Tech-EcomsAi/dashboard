## Staging 
created branch staging for dev

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2MxoESWL0R0wv_uh-84jUu_JBtkm4dyI",
  authDomain: "ecomsai.firebaseapp.com",
  projectId: "ecomsai",
  storageBucket: "ecomsai.appspot.com",
  messagingSenderId: "461236130629",
  appId: "1:461236130629:web:b3fab28090856c05c7a42c",
  measurementId: "G-8QJNFHDGNL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);