import React from "react";
import useFirestore from "../../hooks/useFirestore";
import { motion } from "framer-motion";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { deleteDoc, doc } from "firebase/firestore";
import { projectFireStore } from "../../firebase/config";
import { deleteObject, getStorage, ref } from "firebase/storage";

const ImageGrid = ({ setSelectedImg }) => {
  const { docs } = useFirestore("image_posts");

  const handleDelete = async (post) => {
    try {
      const storage = getStorage();
      const docRef = doc(projectFireStore, "image_posts", post.id);
      console.log();

      // Remove the 'capital' field from the document
      await deleteDoc(docRef);
      console.log('deleted from firestore');
      // Delete the file
      const { path } = post;
      console.log(path);
      const storageRef = ref(storage, path);

      await deleteObject(storageRef);
      console.log('deleted from store');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="img-grid">
      {docs &&
        docs?.map((doc) => (
          <motion.div>
            <DeleteForeverIcon width={20} onClick={() => handleDelete(doc)} />
            <motion.div
              className="img-wrap"
              key={doc.id}
              layout
              whileHover={{ opacity: 1 }}
              onClick={() => setSelectedImg(doc.imageURL)}
            >
              <motion.img
                src={doc.imageURL}
                alt="uploaded-image-not-found"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              />
            </motion.div>
          </motion.div>
        ))}
    </div>
  );
};

export default ImageGrid;
