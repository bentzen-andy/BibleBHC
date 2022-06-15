import React, { useState } from "react";
import {
  View,
  Keyboard,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import Toast from "react-native-root-toast";
import { storeQuestion } from "../../helpers/fb-questions";

const QuestionForm = ({ navigation, route }) => {
  const [enteredQuestion, setEnteredQuestion] = useState("");
  const [validationMsg, setValidationMsg] = useState("");

  const clearInput = () => {
    setEnteredQuestion("");
    Keyboard.dismiss();
  };

  const handleSubmit = () => {
    if (enteredQuestion === "") {
      setValidationMsg("Entry cannot be blank.");
      return;
    } else {
      setValidationMsg("");
    }
    storeQuestion(enteredQuestion);
    setEnteredQuestion("");
    Keyboard.dismiss();
    Toast.show("Your question has been submitted!", {
      duration: Toast.durations.LONG,
      animation: true,
      hideOnPress: true,
    });
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ height: "100%", margin: 20 }}>
          <Text style={styles.text}>
            Ask a question about life, faith, or anything!{" "}
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
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: "#fff" },
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
    // marginBottom: 300,
    textAlign: "right",
  },
  buttonTopRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    textAlign: "right",
    // marginLeft: 20,
  },
  buttonSecondRow: {
    flex: 7,
    flexDirection: "row",
    justifyContent: "flex-end",
    textAlign: "right",
  },
  cancel: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // marginLeft: 30,
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

// style={{
//   height: 40,
//   width: 160,
//   backgroundColor: "#333",
//   flex: 1,
//   justifyContent: "center",
//   alignItems: "center",
// }}

export default QuestionForm;
