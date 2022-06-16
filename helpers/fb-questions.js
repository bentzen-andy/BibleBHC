import { getDatabase, push, ref } from "firebase/database";

export function storeQuestion(item) {
  const db = getDatabase();
  const reference = ref(db, "Questions/");
  push(reference, item);
}
