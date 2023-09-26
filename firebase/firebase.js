// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2l8JLPiz-h6Ixz5ISt9YBwsyDkCru9NA",
  authDomain: "ihome-1ca23.firebaseapp.com",
  projectId: "ihome-1ca23",
  storageBucket: "ihome-1ca23.appspot.com",
  messagingSenderId: "849191025396",
  appId: "1:849191025396:web:654000ed610ee26d7a3ca1",
  measurementId: "G-ZTX7KXNJJQ",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export default auth;
