import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD_hJygOoNZj83TzkBXYwiidovu7rzPVlA",
    authDomain: "genzinvest-007.firebaseapp.com",
    projectId: "genzinvest-007",
    storageBucket: "genzinvest-007.firebasestorage.app",
    messagingSenderId: "254234390358",
    appId: "1:254234390358:web:1ab96cf151a7ba9e09b0f7",
    measurementId: "G-Q76C6VNVT1"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, db, googleProvider };
