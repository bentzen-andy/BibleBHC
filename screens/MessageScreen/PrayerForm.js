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
import { storePrayerRequest } from "../../helpers/fb-prayer-request";

// This component gives the user a form to submit anonymous
// prayers directly to our church's youth pastor.
const PrayerForm = () => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredPrayer, setEnteredPrayer] = useState("");
  const [validationMsg, setValidationMsg] = useState("");

  function clearInput() {
    setEnteredName("");
    setEnteredPrayer("");
    setValidationMsg("");
    Keyboard.dismiss();
  }

  // Sends the prayer request along to the server.
  function handleSubmit() {
    if (enteredPrayer === "" || enteredName === "") {
      setValidationMsg("Entry cannot be blank.");
      return;
    } else {
      setValidationMsg("");
    }
    storePrayerRequest({ enteredName, enteredPrayer });
    setEnteredName("");
    setEnteredPrayer("");
    Keyboard.dismiss();
    Toast.show("Your prayer request has been submitted!", {
      duration: Toast.durations.LONG,
      animation: true,
      hideOnPress: true,
    });
  }

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.formContainer}>
          <Text style={styles.text}>
            "My house will be called a house of prayer" Matt 12:13.
          </Text>
          <Text style={styles.text}>
            Submit your prayer request here and Berkley staff will pray for you.
          </Text>

          <Text style={styles.inputLabel}>Name</Text>
          <TextInput
            style={styles.nameInput}
            value={enteredName}
            autoCorrect={true}
            onChangeText={setEnteredName}
          />

          <Text style={styles.inputLabel}>Prayer Request</Text>
          <TextInput
            style={styles.input}
            value={enteredPrayer}
            autoCorrect={true}
            numberOfLines={8}
            multiline
            onChangeText={setEnteredPrayer}
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
  nameInput: {
    padding: 10,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 4,
    fontSize: 18,
  },
  inputLabel: {
    fontSize: 20,
    marginTop: 10,
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

export default PrayerForm;
