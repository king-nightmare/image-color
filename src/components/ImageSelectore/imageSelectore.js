import { Fragment, useState } from "react";
import Classes from "./imageSelectore.module.css";
import ColorThief from "colorthief/dist/color-thief.umd.js";

const ImageSelectore = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [color, setColor] = useState(null);

  function handleImageChange(e) {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(URL.createObjectURL(e.target.files[0]));
    }
  }

  const getColor = () => {
    const image = selectedImage;
    const img = new Image();
    img.src = image;
    img.crossOrigin = "Anonymous";

    img.onload = () => {
      const colorThief = new ColorThief();
      const rgbColor = colorThief.getColor(img);
      const cssColor = `rgb(${rgbColor[0]}, ${rgbColor[1]}, ${rgbColor[2]})`;
      setColor(cssColor);
    };
  };

  return (
    <Fragment>
      <div className={Classes.inputContainor}>
        <h1 className={Classes.header}>Please Select Your Image</h1>
        <input
          className={Classes.choseButton}
          type="file"
          name="file"
          accept="image/*"
          onChange={handleImageChange}
          multiple
        />
      </div>
      {selectedImage && (
        <div>
          <img
            className={Classes.selectedImage}
            src={selectedImage}
            alt="Selected"
            onLoad={getColor}
          />
          <h4>the image color</h4>
          <div
            style={{ backgroundColor: color, width: "3rem", height: "3rem" }}
            className={Classes.imageShowColor}
          ></div>
        </div>
      )}
    </Fragment>
  );
};
export default ImageSelectore;
