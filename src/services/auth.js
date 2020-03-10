import { goto } from '@sapper/app';
import firebase from "firebase/app";

import "firebase/auth";

const config = {
  apiKey: "AIzaSyB_TcTOhn-7jStU9bAv67Rp_YVBZklRWiY",
  authDomain: "testing-auth-c1e75.firebaseapp.com",
  databaseURL: "https://testing-auth-c1e75.firebaseio.com",
  projectId: "testing-auth-c1e75",
  storageBucket: "testing-auth-c1e75.appspot.com",
  messagingSenderId: "842231170614",
  appId: "1:842231170614:web:6b2dc262797e8ff7de7a97"
};

firebase.initializeApp(config);

const register = async ({ email, password }) => {
  try {
    const serverResponse = await firebase.auth().createUserWithEmailAndPassword(email, password);
  } catch (error) {
    console.log(error);
  }
}

const login = async ({ email, password }) => {
  try {
    const user = await firebase.auth().signInWithEmailAndPassword(email, password);

    const idToken = await firebase.auth().currentUser.getIdToken(false);
    const csrfToken = "someCsrfToken";

    fetch("/api/session", {
      method: "post",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        idToken,
        csrfToken
      })
    })

    goto("/profile");
  } catch (error) {
    console.log(error);
  }
}

export const logout = async () => {
  try {
    const serverResponse = await firebase.auth().signOut();
    await fetch("/api/clear_session", {
      method: "post",
    })
    goto("auth/login");
  } catch (error) {
    console.log(error);
  }
}

// const confirm = ({ email, code }) => {

// }

// const request_reset = () => {

// }

// const reset = () => {

// }


export default {
  register,
  login,
  logout
}