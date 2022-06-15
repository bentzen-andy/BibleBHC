import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const PreviewImage = ({ capturedImage, setPreviewVisible }) => {
  const savePhoto = async () => {
    const storage = getStorage();
    const uri = capturedImage.uri;
    const imageName = capturedImage.uri.split("/").pop();

    const response = await fetch(uri);
    const blob = await response.blob();

    const storageRef = ref(storage, `QuestionScreenUploads/${imageName}`);

    uploadBytes(storageRef, blob).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });
  };

  return (
    <ImageBackground
      source={{ uri: capturedImage && capturedImage.uri }}
      style={styles.container}
    >
      <View style={styles.buttonContainer}>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            onPress={() => setPreviewVisible(false)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Re-take</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={savePhoto} style={styles.button}>
            <Text style={styles.buttonText}>save photo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "column",
    padding: 15,
    justifyContent: "flex-end",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    width: 130,
    height: 40,
    alignItems: "center",
    borderRadius: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
  },
});
export default PreviewImage;
