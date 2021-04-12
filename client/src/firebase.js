 import  firebase from 'firebase';
 
 // Your web app's Firebase configuration


 const firebaseConfig = {
    apiKey: "AIzaSyCbfRQVFB3aR3mno-x3SZek3GOQHqNdORY",
    authDomain: "ecommerce-f832f.firebaseapp.com",
    projectId: "ecommerce-f832f",
    storageBucket: "ecommerce-f832f.appspot.com",
    messagingSenderId: "664409523451",
    appId: "1:664409523451:web:0f920e653bb06b3ff7dc5e"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  //export 
  export const auth=firebase.auth()
  export const googleAuthProvider=new firebase.auth.GoogleAuthProvider();