import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Toast from "react-native-root-toast";
import { storeQuestion } from "../../helpers/fb-questions";

const QuestionScreen = () => {
  const [enteredQuestion, setEnteredQuestion] = useState("");

  const clearInput = () => {
    setEnteredQuestion("");
  };

  const handleSubmit = () => {
    storeQuestion(enteredQuestion);
    setEnteredQuestion("");
    Toast.show("Your question has been submitted!", {
      duration: Toast.durations.LONG,
      animation: true,
      hideOnPress: true,
    });
  };

  function validate(msg) {
    return msg === "" ? "Entry cannot be blank." : "";
  }

  return (
    <View style={styles.container}>
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
        // errorStyle={styles.inputError}
        // errorMessage={validate(enteredQuestion)}
        onChangeText={setEnteredQuestion}
      />
      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={clearInput} style={styles.cancel}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSubmit} style={styles.submit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { margin: 20 },
  text: { fontSize: 24 },
  input: {
    marginTop: 20,
    padding: 10,
    height: 80,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 4,
  },
  buttonRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    textAlign: "right",
  },
  cancel: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 30,
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
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default QuestionScreen;

// style={{
//   height: 40,
//   width: 160,
//   backgroundColor: "#333",
//   flex: 1,
//   justifyContent: "center",
//   alignItems: "center",
// }}
