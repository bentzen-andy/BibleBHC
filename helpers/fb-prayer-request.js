import { getDatabase, push, ref } from "firebase/database";

export function storePrayerRequest(item) {
  const db = getDatabase();
  const reference = ref(db, "PrayerRequests/");
  push(reference, item);
}
