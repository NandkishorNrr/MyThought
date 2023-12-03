import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyCqWM9-xnFaT6VLuJCp75FwlNvQ6ahYcq0",
  authDomain: "mythought-cb312.firebaseapp.com",
  projectId: "mythought-cb312",
  storageBucket: "mythought-cb312.appspot.com",
  messagingSenderId: "293621219167",
  appId: "1:293621219167:web:78fe75e7a1c2aa443500ea"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();