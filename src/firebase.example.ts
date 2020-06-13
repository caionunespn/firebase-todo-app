import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";

//INSERT FIREBASE APP CONFIGURATION
const firebaseConfig = {};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const githubProvider = new firebase.auth.GithubAuthProvider();
