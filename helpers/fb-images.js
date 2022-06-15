import { getStorage, ref, uploadBytes } from "firebase/storage";

export async function storeImage(img, filename) {
  const storage = getStorage();
  const uri = img.uri;

  const response = await fetch(uri);
  const blob = await response.blob();

  const storageRef = ref(storage, `QuestionScreenUploads/${filename}`);

  uploadBytes(storageRef, blob).then((snapshot) => {});
}
