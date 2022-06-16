import React, { useEffect, useState } from "react";
import {
  View,
  Keyboard,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import Toast from "react-native-root-toast";
import { storeQuestion } from "../../helpers/fb-questions";
import { storeImage } from "../../helpers/fb-images";
import { AntDesign } from "@expo/vector-icons";

// This component gives the user a form to submit anonymous
// questions directly to our church's youth pastor.
const QuestionForm = ({ navigation, route }) => {
  const [enteredQuestion, setEnteredQuestion] = useState("");
  const [validationMsg, setValidationMsg] = useState("");
  const [savedImage, setSavedImage] = useState(null);

  // Checks and handles a photo in the case that the user
  // just saved an image.
  useEffect(() => {
    if (route.params) {
      setSavedImage(route.params);
    }
  }, [route?.params]);

  function clearInput() {
    setEnteredQuestion("");
    setValidationMsg("");
    setSavedImage(null);
    Keyboard.dismiss();
  }

  // Sends the question and the image along to the server.
  // Note that the image and question must be stored separately
  // due to Firebase requirements, but they are linked by the
  // same ID, which is taken from the image's assigned name.
  function handleSubmit() {
    if (enteredQuestion === "") {
      setValidationMsg("Entry cannot be blank.");
      return;
    } else {
      setValidationMsg("");
    }
    const imageId = savedImage ? savedImage.uri.split("/").pop() : "n/a";
    storeQuestion({ enteredQuestion, imageId });
    setEnteredQuestion("");
    Keyboard.dismiss();
    Toast.show("Your question has been submitted!", {
      duration: Toast.durations.LONG,
      animation: true,
      hideOnPress: true,
    });
    if (savedImage) {
      storeImage(savedImage, imageId);
    }
    setSavedImage(null);
  }

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.formContainer}>
          <Text style={styles.text}>
            Ask a question about life, faith, or anything!
          </Text>
          <TextInput
            style={styles.input}
            value={enteredQuestion}
            autoFocus={true}
            autoCorrect={true}
            numberOfLines={8}
            multiline
            onChangeText={setEnteredQuestion}
          />
          <Text style={styles.inputError}>{validationMsg}</Text>

          <View style={styles.buttonRows}>
            <View style={styles.buttonTopRow}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("CameraView");
                }}
                style={styles.submitPhotoButton}
              >
                <Text style={styles.buttonText}>Attach Photo</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.buttonSecondRow}>
              <TouchableOpacity onPress={clearInput} style={styles.cancel}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSubmit} style={styles.submit}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.attachmentImg}>
            {savedImage && (
              <AntDesign
                name="picture"
                size={48}
                color="black"
                style={styles.attachmentImgIcon}
              />
            )}

            {savedImage && (
              <Text style={styles.attachmentImgText}>Image attached</Text>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: "#fff" },
  formContainer: { height: "100%", margin: 20 },
  text: { fontSize: 24 },
  input: {
    marginTop: 20,
    padding: 10,
    height: 80,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 4,
    fontSize: 18,
  },
  inputError: {
    color: "#c45",
    fontWeight: "bold",
  },
  buttonRows: {
    flex: 1,
    flexDirection: "column",
    alignContent: "flex-end",
    textAlign: "right",
  },
  buttonTopRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    textAlign: "right",
  },
  buttonSecondRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    textAlign: "right",
  },
  attachmentImg: { flex: 2.5 },
  attachmentImgIcon: { textAlign: "right" },
  attachmentImgText: { textAlign: "right" },
  cancel: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    marginVertical: 20,
    backgroundColor: "#555",
    borderRadius: 9,
    height: 40,
    width: 160,
  },
  submit: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    marginVertical: 20,
    backgroundColor: "#42a5f5",
    borderRadius: 9,
    height: 40,
    width: 160,
  },

  submitPhotoButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // marginLeft: 10,
    marginVertical: 20,
    backgroundColor: "#42a5f5",
    borderRadius: 9,
    height: 40,
    width: 160,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default QuestionForm;
