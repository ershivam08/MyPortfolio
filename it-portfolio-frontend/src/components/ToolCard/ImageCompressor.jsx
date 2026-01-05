import { compressImage } from "../../utils/imageCompressor";
import React from "react";

const ImageCompressor = () => {
  const handleImage = (e) => {
    compressImage(e.target.files[0], (img) => {
      const link = document.createElement("a");
      link.href = img;
      link.download = "compressed-image.jpg";
      link.click();
    });
  };

  return (
    <div className="tool-box">
      <h3>Image Compressor</h3>
      <input type="file" onChange={handleImage} />
    </div>
  );
};

export default ImageCompressor;
