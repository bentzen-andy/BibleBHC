import React, { useState } from "react";
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

// This component gives the user a form to submit anonymous
// questions directly to our church's youth pastor.
const QuestionForm = ({ navigation, route }) => {
  const [enteredQuestion, setEnteredQuestion] = useState("");
  const [validationMsg, setValidationMsg] = useState("");

  function clearInput() {
    setEnteredQuestion("");
    setValidationMsg("");
    Keyboard.dismiss();
  }

  function handleSubmit() {
    if (enteredQuestion === "") {
      setValidationMsg("Entry cannot be blank.");
      return;
    } else {
      setValidationMsg("");
    }
    storeQuestion({ enteredQuestion });
    setEnteredQuestion("");
    Keyboard.dismiss();
    Toast.show("Your question has been submitted!", {
      duration: Toast.durations.LONG,
      animation: true,
      hideOnPress: true,
    });
  }

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.formContainer}>
          <Text style={styles.text}>Anonymous Questions:</Text>
          <Text style={styles.text}>
            Ask a question about life, faith, or anything!
          </Text>

          <Text style={styles.inputLabel}>Question</Text>
          <TextInput
            style={styles.input}
            value={enteredQuestion}
            autoCorrect={true}
            numberOfLines={8}
            multiline
            onChangeText={setEnteredQuestion}
          />
          <Text style={styles.inputError}>{validationMsg}</Text>

          <View style={styles.buttonRows}>
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
  formContainer: { height: "100%", margin: 20 },
  text: { fontSize: 24, marginBottom: 20 },
  inputLabel: {
    fontSize: 20,
  },
  input: {
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
  buttonSecondRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    textAlign: "right",
  },
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
    // backgroundColor: "#42a5f5",
    backgroundColor: "#3057d4",
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
