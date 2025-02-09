// Для роботи із firebase обовʼязково треба ініціалізувати проект
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCbAqlwvSTWjT2ByHMRyL1h0VJbKVVmUXI",
  authDomain: "avesomeproject-6d72d.firebaseapp.com",
  databaseURL: "<https://avesomeproject-6d72d.firebaseio.com>",
  projectId: "avesomeproject-6d72d",
  storageBucket: "gs://avesomeproject-6d72d.firebasestorage.app",
  //   storageBucket: "avesomeproject-6d72d.appspot.com",
  //   appId: "1:666015081857:ios:d05606bae9e155c674f480",
  //   messagingSenderId: "sender-id",
  //   measurementId: "G-measurement-id",
};

const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getFirestore(app);
export const storage = getStorage(app);
