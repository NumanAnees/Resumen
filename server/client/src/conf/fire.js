import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';

const config = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
  };
  const fire = firebase.initializeApp(config);
  export const googleProvider = new firebase.auth.GoogleAuthProvider();
  export  const facebookProvider = new firebase.auth.FacebookAuthProvider();

  
  export default fire;