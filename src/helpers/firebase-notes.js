import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { projectFireStore } from "../firebase/config";

const DOC_URI = "notes";

export const addNotesToFirebase = async (data) => {
  await addDoc(collection(projectFireStore, DOC_URI), {
    desc: data.desc,
    title: data.title,
    createdAt: new Date(),
    user: data.user || null,
    isPinned: data.isPinned,
  });
};

export const deleteNotesFromFirebase = async (id) => {
  console.log(id);
  await deleteDoc(doc(projectFireStore, DOC_URI, id));
  console.log(id + "deleted from the firestore");
};

export const updateFirebaseNote = async (id, data) => {
  const docRef = doc(projectFireStore, DOC_URI, id);

  // Set the "capital" field of the city 'DC'
  await updateDoc(docRef, {
    desc: data.desc,
    title: data.title,
    recentEditedAt: new Date(),
  });

};
