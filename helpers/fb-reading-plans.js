import { getDatabase, onValue, ref } from "firebase/database";

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
