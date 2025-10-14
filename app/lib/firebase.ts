import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC0-f75VaCPlGOkSsA3PpSh0kCZANm6Dvo",
  authDomain: "vinea-connect.firebaseapp.com",
  projectId: "vinea-connect",
  storageBucket: "vinea-connect.firebasestorage.app",
  messagingSenderId: "405945940329",
  appId: "1:405945940329:web:dfac20b74bc554c4b0a5f8",
  measurementId: "G-ZMW68SYTVB"
};
// Ensure Firebase is initialized only once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase Auth
const auth = getAuth(app);

// Export Auth + OTP utilities
export { auth, RecaptchaVerifier, signInWithPhoneNumber };
