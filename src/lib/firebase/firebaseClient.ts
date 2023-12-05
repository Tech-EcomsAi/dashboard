import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

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
const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
const firebaseClient = getFirestore();
const firebaseAuth = getAuth();

export { firebaseApp, firebaseClient, firebaseAuth }