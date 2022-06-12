import { getDatabase, onValue, push, ref } from "firebase/database";

export function storeQuestion(item) {
  // console.log("Writing: ", item);
  const db = getDatabase();
  const reference = ref(db, "Questions/");
  push(reference, item);
}

export function setupQuestionListener(updateFunc) {
  const db = getDatabase();
  const reference = ref(db, "Questions/");
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
