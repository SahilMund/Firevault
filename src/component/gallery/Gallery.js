import React , { useState } from "react";
import Title from "./Title";
import UploadForm from "./UploadForm";
import ImageGrid from './ImageGrid';
import Modal from './Modal';

function Gallery() {
  const [selectedImg, setSelectedImg] = useState(null);
  const [darkmode,setDarkmode] = useState(false);
  return (

    <div className={darkmode ? "galleryHome darkmode" : "galleryHome" }>
  
    <Title darkmode={darkmode} setDarkmode={setDarkmode}/>
    <UploadForm />
    <ImageGrid setSelectedImg={setSelectedImg} />
    { selectedImg && (
      <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
    )}
  </div>
  );
}

export default Gallery;
