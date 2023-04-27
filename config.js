// Import the functions you need from the SDKs you need
import firebase from "firebase";
require("@firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyCoEK7ZCbac8bNEjwi0DmDp2qXtE1P95Qg",
  authDomain: "biblioteca-digital-pract-226f1.firebaseapp.com",
  projectId: "biblioteca-digital-pract-226f1",
  storageBucket: "biblioteca-digital-pract-226f1.appspot.com",
  messagingSenderId: "977438712517",
  appId: "1:977438712517:web:ae9a14df6c896c259286ac"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();