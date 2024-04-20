import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAVoX9eUcucQqk-srfBiRMkykLLsu3dLWg",
  authDomain: "task-manager-c0249.firebaseapp.com",
  projectId: "task-manager-c0249",
  storageBucket: "task-manager-c0249.appspot.com",
  messagingSenderId: "453446276266",
  appId: "1:453446276266:web:5df2f214022a7470536cd3",
  measurementId: "G-E74X1L318D"
};

export const app = initializeApp(firebaseConfig);