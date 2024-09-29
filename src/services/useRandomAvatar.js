import { useState, useCallback } from "react";

// Imagens padrão
import defaultImage1 from "../assets/default-images/default1.jpg";
import defaultImage2 from "../assets/default-images/default2.jpg";
import defaultImage3 from "../assets/default-images/default3.jpg";
import defaultImage4 from "../assets/default-images/default4.jpg";
import defaultImage5 from "../assets/default-images/default5.jpg";
import defaultImage6 from "../assets/default-images/default6.jpg";
import defaultImage7 from "../assets/default-images/default7.jpg";
import defaultImage8 from "../assets/default-images/default8.jpg";
import defaultImage9 from "../assets/default-images/default9.jpg";
import defaultImage10 from "../assets/default-images/default10.jpg";

// Array de imagens padrão
const defaultImages = [
  defaultImage1,
  defaultImage2,
  defaultImage3,
  defaultImage4,
  defaultImage5,
  defaultImage6,
  defaultImage7,
  defaultImage8,
  defaultImage9,
  defaultImage10,
];

export default function useRandomAvatar(initialImage = "") {
  const [selectedImage, setSelectedImage] = useState(initialImage);

  const getRandomDefaultImage = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * defaultImages.length);
    return defaultImages[randomIndex];
  }, []);

  const getImageToDisplay = useCallback(() => {
    return selectedImage || getRandomDefaultImage();
  }, [selectedImage, getRandomDefaultImage]);

  return {
    selectedImage,
    setSelectedImage,
    getImageToDisplay,
  };
}