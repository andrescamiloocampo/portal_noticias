import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCXrq7pgpeouXpgF-pOJ2V1QPBHFEfL2hs",
  authDomain: "portal-2527e.firebaseapp.com",
  projectId: "portal-2527e",
  storageBucket: "portal-2527e.appspot.com",
  messagingSenderId: "155731343374",
  appId: "1:155731343374:web:cd37301ba147f3e924e45f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export {app,db}

