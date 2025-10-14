import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBgWA_TA9URGxfbu5oXvYuhsgY4I7aCsOU",
  authDomain: "vinea-connect-ff2fe.firebaseapp.com",
  projectId: "vinea-connect-ff2fe",
  storageBucket: "vinea-connect-ff2fe.firebasestorage.app",
  messagingSenderId: "624356973331",
  appId: "1:624356973331:web:dd2027a87ed56129eb58e6",
};

// Ensure Firebase is initialized only once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase Auth
const auth = getAuth(app);

// Export Auth + OTP utilities
export { auth, RecaptchaVerifier, signInWithPhoneNumber };
