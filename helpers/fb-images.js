import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export async function storeImage(img, filename) {
  const storage = getStorage();
  const uri = img.uri;

  const response = await fetch(uri);
  const blob = await response.blob();

  const storageRef = ref(storage, `QuestionScreenUploads/${filename}`);

  uploadBytes(storageRef, blob).then((snapshot) => {});
}

export async function getImage(assetPath, assetFilename, callback = (f) => f) {
  // I'm following the docs here: https://firebase.google.com/docs/storage/web/create-reference
  const storage = getStorage();
  const storageRef = ref(storage);
  const imagesRef = ref(storageRef, assetPath);
  const spaceRef = ref(imagesRef, assetFilename);
  const urlString = await getDownloadURL(spaceRef);
  callback(urlString);
  return urlString;
}
