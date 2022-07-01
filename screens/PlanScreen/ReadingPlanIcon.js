import React, { useState, useEffect } from "react";
import { Image, StyleSheet } from "react-native";
import { getImage } from "../../helpers/fb-images";

const ReadingPlanIcon = ({ imgName }) => {
  const [imageURL, setImageURL] = useState(null);

  useEffect(() => {
    getImage("ReadingPlanAssets", imgName, (path) => {
      setImageURL(path);
    });
  }, []);

  return (
    <Image
      source={
        imageURL
          ? { uri: imageURL }
          : require("../../assets/placeholder-image.png")
      }
      style={styles.icon}
    />
  );
};

const styles = StyleSheet.create({
  icon: { width: 100, height: 55 },
});

export default ReadingPlanIcon;
