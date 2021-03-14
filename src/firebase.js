import firebase from "firebase/app";
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBjpHbB5KIOTPfD81cpyfqaQBca38tyekE",
  authDomain: "crud-tareas-9a69d.firebaseapp.com",
  projectId: "crud-tareas-9a69d",
  storageBucket: "crud-tareas-9a69d.appspot.com",
  messagingSenderId: "113790795582",
  appId: "1:113790795582:web:c13e7c22fff3876217f66f",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig)


export {firebase}
