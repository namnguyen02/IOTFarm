// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAs4t_GpOWtZ2sOwfm70UXSewR3m2x4D7o",
  authDomain: "iotfarm-c345c.firebaseapp.com",
  databaseURL: "https://iotfarm-c345c-default-rtdb.firebaseio.com",
  projectId: "iotfarm-c345c",
  storageBucket: "iotfarm-c345c.appspot.com",
  messagingSenderId: "641840001237",
  appId: "1:641840001237:web:dc039ccea3d98672f6725c",
  measurementId: "G-NV1GCCY8B6"
};
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
export {auth}

