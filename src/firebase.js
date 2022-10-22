import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAKqv_SPm084HouibYoi0lL8q_sPD6ZKis",
    authDomain: "reels-clone-ad8d8.firebaseapp.com",
    projectId: "reels-clone-ad8d8",
    storageBucket: "reels-clone-ad8d8.appspot.com",
    messagingSenderId: "471067656601",
    appId: "1:471067656601:web:380ccd5ad2b434ce505308"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const firestore = firebase.firestore();
export const database = {
    users: firestore.collection('users'),
    posts: firestore.collection('posts'),
    comments: firestore.collection('comments'),
    getTimeStamp: firebase.firestore.FieldValue.serverTimestamp
}

export const storage = firebase.storage()