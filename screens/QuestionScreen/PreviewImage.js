import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

const PreviewImage = ({ navigation, capturedImage, setPreviewVisible }) => {
  const savePhoto = async () => {
    navigation.navigate("QuestionForm", capturedImage);
  };

  return (
    <ImageBackground
      source={{ uri: capturedImage && capturedImage.uri }}
      style={styles.container}
    >
      <View style={styles.buttonContainer}>
        {/* <Viewxxx style={styles.buttonRow}> */}
        <TouchableOpacity
          onPress={() => setPreviewVisible(false)}
          style={styles.button}
        >
          {/* <Text style={styles.buttonText}>Re-take</Text> */}
          <AntDesign
            name="closecircle"
            size={48}
            color="#fff"
            style={{ margin: -20 }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={savePhoto} style={styles.button}>
          {/* <Text style={styles.buttonText}>Save photo</Text> */}
          <AntDesign
            name="checkcircle"
            size={48}
            color="#fff"
            style={{ margin: -20 }}
          />
        </TouchableOpacity>
        {/* </Viewxxx> */}
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
});
export default PreviewImage;
