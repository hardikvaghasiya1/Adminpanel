// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_BZGyOcgnlUNweQz4byAnVLK86Kn4qpY",
  authDomain: "adminpanel-c5add.firebaseapp.com",
  projectId: "adminpanel-c5add",
  storageBucket: "adminpanel-c5add.appspot.com",
  messagingSenderId: "829941334380",
  appId: "1:829941334380:web:d03229d01cdaae954e3349",
  measurementId: "G-GJHWDKTKLX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

