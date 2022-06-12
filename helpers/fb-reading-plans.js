import { getDatabase, onValue, push, ref } from "firebase/database";

import { firebaseConfig } from "./fb-credentials";
import { initializeApp } from "firebase/app";

export function initReadingPlanDB() {
  initializeApp(firebaseConfig);
}

export function storeReadingPlanItem(item) {
  // console.log("Writing: ", item);
  const db = getDatabase();
  const reference = ref(db, "ReadingPlanData/");
  push(reference, item);
}

export function setupReadingPlanListener(updateFunc) {
  const db = getDatabase();
  const reference = ref(db, "ReadingPlanData/");
  onValue(reference, (snapshot) => {
    if (snapshot?.val()) {
      const fbObject = snapshot.val();
      const newArr = [];
      Object.keys(fbObject).map((key, index) => {
        newArr.push({ ...fbObject[key], id: key });
      });
      updateFunc(newArr);
    } else {
      updateFunc([]);
    }
  });
}
