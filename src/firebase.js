import firebase from 'firebase/app';
import 'firebase/database'
import 'firebase/messaging'
import 'firebase/storage'


var firebaseConfig = {
  apiKey: "AIzaSyDBG7YEJCpIt9XMcTEuhekQT05FJUYj4B4",
  authDomain: "quandrio-ee823.firebaseapp.com",
  databaseURL: "https://quandrio-ee823.firebaseio.com",
  projectId: "quandrio-ee823",
  storageBucket: "quandrio-ee823.appspot.com",
  messagingSenderId: "522593060688",
  appId: "1:522593060688:web:95ad8e30f7952e54"
};

firebase.initializeApp(firebaseConfig);

var messaging = firebase.messaging();

messaging.usePublicVapidKey("BImgeLGYBV9aNJndBZoQJoSexNssY8Dg88iRm4pYZI__oXGqxdrPQue4e_3ekaf9q2VZGj20xBDZmJE6wyuIPzs");

var database = firebase.database().ref();

var storage = firebase.storage();

export {
  database,
  messaging,
  storage
};
