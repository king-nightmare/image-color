import { Fragment, useState } from "react";
import Classes from "./imageSelectore.module.css";
import ColorThief from "colorthief/dist/color-thief.umd.js";

const ImageSelectore = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [colors, setColors] = useState({});

  function handleImageChange(e) {
    if (e.target.files && e.target.files.length > 0) {
      const images = [];
      for (let i = 0; i < e.target.files.length; i++) {
        images.push(URL.createObjectURL(e.target.files[i]));
      }
      setSelectedImages(images);
    }
  }

  const getColor = (image) => {
    const img = new Image();
    img.src = image;
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const colorThief = new ColorThief();
      const rgbColor = colorThief.getColor(img);
      const cssColor = `rgb(${rgbColor[0]}, ${rgbColor[1]}, ${rgbColor[2]})`;
      setColors((prevColors) => ({
        ...prevColors,
        [image]: cssColor,
      }));
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
      {selectedImages.length > 0 && (
        <div className={Classes.imageWcolor}>
          {selectedImages.map((image) => (
            <div key={image}>
              <img
                className={Classes.selectedImage}
                src={image}
                alt="Selected"
                onLoad={() => getColor(image)}
              />
              <h4>the image color</h4>
              <div
                style={{
                  backgroundColor: colors[image],
                  width: "3rem",
                  height: "3rem",
                }}
                className={Classes.imageShowColor}
              ></div>
            </div>
          ))}
        </div>
      )}
    </Fragment>
  );
};
export default ImageSelectore;
