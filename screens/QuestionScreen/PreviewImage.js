import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

const PreviewImage = ({ navigation, capturedImage, setPreviewVisible }) => {
  async function savePhoto() {
    navigation.navigate("QuestionForm", capturedImage);
  }

  return (
    <ImageBackground
      source={{ uri: capturedImage && capturedImage.uri }}
      style={styles.container}
    >
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => setPreviewVisible(false)}
          style={styles.button}
        >
          <AntDesign
            name="closecircle"
            size={48}
            color="#fff"
            style={styles.cameraButton}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={savePhoto} style={styles.button}>
          <AntDesign
            name="checkcircle"
            size={48}
            color="#fff"
            style={styles.cameraButton}
          />
        </TouchableOpacity>
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
    backgroundColor: "transparent",
    flexDirection: "row",
    marginBottom: 40,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
  },
  cameraButton: { margin: -20 },
});
export default PreviewImage;
