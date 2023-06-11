import { useState, useEffect } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
// import db from "../firebase/config";
import { addDoc, collection } from "firebase/firestore";
import { projectFireStore } from "../firebase/config";
import { useAuth } from "../contexts/AuthContext";

const useStorage = () => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  const { currentUser } = useAuth();

  // useEffect(() => {
  //   // references
  //   const storageRef = projectStorage.ref(file.name);
  //   const collectionRef = projectFirestore.collection('images');

  //   storageRef.put(file).on('state_changed', (snap) => {
  //     let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
  //     setProgress(percentage);
  //   }, (err) => {
  //     setError(err);
  //   }, async () => {
  // const url = await storageRef.getDownloadURL();
  // const createdAt = timestamp();
  // await collectionRef.add({ url, createdAt });
  // setUrl(url);
  //   });
  // }, [file]);

  const storage = getStorage();

  // useEffect(() => {

  //   console.log();
  // }, [file]);

  const addImageToFirebase = (file, collectionName) => {
    const fileId = uuidv4();

    console.log(file);
    const formatFile = file.type.split("/")[1];
    // const storageRef = ref(storage, `images/${fileId}.${formatFile}`);
    const storageRef = ref(storage, `images/${fileId}.${formatFile}`);

    console.log(storageRef);

    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setProgress(progress);
      },
      (error) => {
        // Handle unsuccessful uploads
        setError(error);
      },
      async () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        const createdAt = new Date();
        // await collectionRef.add({ downloadURL, createdAt });

        console.log("printing in hooks", `images/${fileId}.${formatFile}`);

        await addDoc(collection(projectFireStore, collectionName), {
          imageURL: downloadURL,
          createdAt,
          user: currentUser.uid,
          path: `images/${fileId}.${formatFile}`,
        });
        setUrl(downloadURL);

        console.log("File available at", downloadURL, createdAt);
      }
    );
  };

  return { progress, url, error, addImageToFirebase };
};

export default useStorage;
