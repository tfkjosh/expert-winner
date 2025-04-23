// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth'; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUYi-4w-nbtSTnSrfu7Ofb6UJbN1PXJZQ",
  authDomain: "blog-1c878.firebaseapp.com",
  projectId: "blog-1c878",
  storageBucket: "blog-1c878.firebasestorage.app",
  messagingSenderId: "704883921554",
  appId: "1:704883921554:web:306d15d0180a1622d38c4b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//google auth

const provider = new GoogleAuthProvider();

const auth = getAuth();

export const authWithGoogle = async () => {
    let user = null;

    await signInWithPopup(auth, provider)
    .then((result) => {
        user = result.user
    })
    .catch((err) => {
        console.log(err)
    })

    return user;
}