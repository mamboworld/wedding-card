import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBz0Gh_NH6BTqAJFsbsnPANAYsG39XZMrY",
  authDomain: "myweddingcard-8860e.firebaseapp.com",
  projectId: "myweddingcard-8860e",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 