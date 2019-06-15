// Import and configure the Firebase SDK
// These scripts are made available when the app is served or deployed on Firebase Hosting
// If you do not serve/host your project using Firebase Hosting see https://firebase.google.com/docs/web/setup
//importScripts('/__/firebase/5.5.6/firebase-app.js');
//importScripts('/__/firebase/5.5.6/firebase-messaging.js');
//importScripts('/__/firebase/init.js');
import * as Cookies from "js-cookie"
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

firebase.initializeApp({
  'messagingSenderId': '522593060688'
});

const messaging = firebase.messaging();

messaging.usePublicVapidKey("BImgeLGYBV9aNJndBZoQJoSexNssY8Dg88iRm4pYZI__oXGqxdrPQue4e_3ekaf9q2VZGj20xBDZmJE6wyuIPzs");

Notification.requestPermission().then((permission) => {
  if (permission === 'granted') {
    console.log('Notification permission granted.');
    // TODO(developer): Retrieve an Instance ID token for use with FCM.
    if (currentToken) {
        Cookies.set('pushToken', currentToken)
  } else {
    // Show permission request.
    console.log('No Instance ID token available. Request permission to generate one.');
    // Show permission UI.
    messaging.onTokenRefresh(() => {
      messaging.getToken().then((refreshedToken) => {
      console.log('Token refreshed.');
      Cookies.set('pushToken', currentToken)
    // Indicate that the new Instance ID token has not yet been sent to the
    // app server.
    // ...
  }).catch((err) => {
    console.log('Unable to retrieve refreshed token ', err);
    showToken('Unable to retrieve refreshed token ', err);
  });
});
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
  showToken('Error retrieving Instance ID token. ', err);
  setTokenSentToServer(false);
});
    // ...
  } else {
    console.log('Unable to get permission to notify.');
  }
});

//app in foreground
messaging.onMessage((payload) => {
  console.log('Message received foreground. ', payload.data.notification);
  const { title, body } = payload.data.notification
  var notificationTitle = title;
  var notificationOptions = {
    body: body,
    icon: '/assets/android-chrome-512x512.png'
  };
  console.log(notificationTitle)
  console.log(notificationOptions)
  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});

messaging.setBackgroundMessageHandler(function(payload) {
  console.log('Message received background. ', payload.data.notification);
  const { title, body } = payload.data.notification
  var notificationTitle = title;
  var notificationOptions = {
    body: body,
    icon: '/assets/android-chrome-512x512.png'
  };
  console.log(notificationTitle)
  console.log(notificationOptions)
  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});
