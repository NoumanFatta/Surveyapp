import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDAX3uhYUEChZSmjgRm41RXzwfrqZM4ML4",
    authDomain: "covid-survey-e9c93.firebaseapp.com",
    projectId: "covid-survey-e9c93",
    storageBucket: "covid-survey-e9c93.appspot.com",
    messagingSenderId: "23793045714",
    appId: "1:23793045714:web:e908b108c74d6095d51d0b",
    measurementId: "G-GLC5N8NQJN"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();
