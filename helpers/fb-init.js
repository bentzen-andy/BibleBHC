import { firebaseConfig } from "./fb-credentials";
import { initializeApp } from "firebase/app";

export function initDB() {
  initializeApp(firebaseConfig);
}
