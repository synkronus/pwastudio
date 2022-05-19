import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.1/firebase-app.js';
import { getMessaging, onBackgroundMessage, isSupported } from 'https://www.gstatic.com/firebasejs/9.0.1/firebase-messaging-sw.js';

const app = initializeApp({
  apiKey: "AIzaSyD-dXagoiXG6LsqS6yn75zaBDX5lifZv30",
  authDomain: "supabaseauthfcm.firebaseapp.com",
  projectId: "supabaseauthfcm",
  storageBucket: "supabaseauthfcm.appspot.com",
  messagingSenderId: "610748673645",
  appId: "1:610748673645:web:35eab0e85d2d7c52745964",
  measurementId: "G-LZYXRYCGGR"
});

isSupported().then(isSupported => {

  if (isSupported) {

    const messaging = getMessaging(app);

    onBackgroundMessage(messaging, ({ notification: { title, body, image } }) => {
      self.registration.showNotification(title, { body, icon: image || '/assets/icons/icon-72x72.png' });
    });

  }

});
