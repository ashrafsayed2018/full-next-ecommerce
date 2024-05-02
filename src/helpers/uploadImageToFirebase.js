import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { firebaseConfig, firebaseStroageURL } from "@/utils";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// create the storage object in firebase
const storage = getStorage(app, firebaseStroageURL);
function createUniqueFileName(getfile) {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2.12);
  return `${getfile.name}-${timestamp}-${randomString}`;
}

export async function helperForUploadImageToFirebase(file) {
  const getfileName = createUniqueFileName(file);

  // create storage reference in firebase storage system
  const storageReference = ref(storage, `product-images/${getfileName}`);
  const uploadImage = uploadBytesResumable(storageReference, file);

  return new Promise(function (resolve, reject) {
    uploadImage.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
        reject(error);
      },
      () => {
        getDownloadURL(uploadImage.snapshot.ref)
          .then((downloadURL) => resolve(downloadURL))
          .catch((error) => reject(error));
      }
    );
  });
}
