import { initializeApp } from "firebase/app";
import firebase from "firebase/app";

//  importing the services
import { getStorage } from "firebase/storage";
// import {firestore} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore";

// firestore : - helps to store the image url's
// store :-  helps to store the images

// // Your web app's Firebase configuration
// var firebaseConfig = {
//   apiKey: "AIzaSyBPu4zHyJnRDjJpJ25IRep-0nEg2alqQHY",
//   authDomain: "my-vault-3.firebaseapp.com",
//   databaseURL: "https://my-vault-3.firebaseio.com",
//   projectId: "my-vault-3",
//   storageBucket: "my-vault-3.appspot.com",
//   messagingSenderId: "233911320472",
//   appId: "1:233911320472:web:0093351f749ccdd7edf5ed"
// };

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlX-PU8YiQZRIBJS_7upZmaczdoiYRSpk",
  authDomain: "vault-app-771c3.firebaseapp.com",
  projectId: "vault-app-771c3",
  storageBucket: "vault-app-771c3.appspot.com",
  messagingSenderId: "143032552184",
  appId: "1:143032552184:web:4790ab8804e8c51156c90d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase
const auth = getAuth(app);
//   starting both services i.e. storage and firestore(it is a real time database)
const projectStorage = getStorage(app);
const projectFireStore = getFirestore(app);

// export { projectStorage, projectFireStore, timestamp };
export { projectStorage, projectFireStore, auth };
