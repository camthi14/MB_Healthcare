import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAIAGKt6TcCarE6KOv-hQzIdr1bdODo9n4",
  authDomain: "bookings-95a02.firebaseapp.com",
  projectId: "bookings-95a02",
  storageBucket: "bookings-95a02.appspot.com",
  messagingSenderId: "957805094333",
  appId: "1:957805094333:web:d1cb1c9d420d0b8a00ded4",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

auth.languageCode = "vi";

export { auth };
export default app;
