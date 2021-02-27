// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyD4akq5Q0sCnMueSRKFpxgNSylQQy-gcOU",
  authDomain: "sw-whatsapp-6a9d8.firebaseapp.com",
  projectId: "sw-whatsapp-6a9d8",
  storageBucket: "sw-whatsapp-6a9d8.appspot.com",
  messagingSenderId: "1075886220410",
  appId: "1:1075886220410:web:98594eaaa7b814960f07c3",
  measurementId: "G-JENPZ8WMFQ"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;