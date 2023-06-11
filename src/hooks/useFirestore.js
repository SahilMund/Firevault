import { useState, useEffect } from "react";
import { projectFireStore, projectFirestore } from "../firebase/config";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";

const useFirestore = (collectionName) => {
  const [docs, setDocs] = useState([]);

  const { currentUser } = useAuth();


  useEffect(() => {
    // const unsub = projectFirestore.collection(collection)
    //   .orderBy('createdAt', 'desc')
    //   .onSnapshot(snap => {
    //     let documents = [];
    //     snap.forEach(doc => {
    //       documents.push({...doc.data(), id: doc.id});
    //     });
    //     setDocs(documents);
    //   });

    // return () => unsub();
    // this is a cleanup function that react will run when
    // a component using the hook unmounts

    console.log(currentUser.uid.toString());
    const q = query(
      collection(projectFireStore, collectionName),
      where("user", "==", currentUser.uid),
      orderBy("createdAt", "desc")
    );

    // console.log(q);
    // switch(collectionName){
    //   case 'notes':

    //   break
    // }
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const imageData = [];
      querySnapshot.forEach((doc) => {
        imageData.push({ ...doc.data(), id: doc.id });
      });

      setDocs(imageData);
    });

    console.log(docs);

    return () => unsubscribe();
  }, [collectionName]);

  return { docs };
};

export default useFirestore;
