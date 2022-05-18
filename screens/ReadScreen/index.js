import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";

const Read = () => {
  const [book, setBook] = useState("");
  const [chapter, setChapter] = useState("");
  const [passage, setPassage] = useState("");

  const handleSubmit = () => {
    lookUpPassage(book, chapter);
    setBook("");
    setChapter("");
  };

  const lookUpPassage = (book, chapter) => {
    fetch(`https://api.esv.org/v3/passage/text/?q=${book}+${chapter}`, {
      headers: {
        Accept: "application/json",
        Authorization: "1b6db31aba45d8b4522b3c284125c18a8d6ebd5d",
      },
    })
      .then((response) => response.json())
      .then((data) => setPassage(data.passages));
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <TextInput style={styles.input} onChangeText={setBook} value={book} />

        <TextInput
          style={styles.input}
          onChangeText={setChapter}
          value={chapter}
          keyboardType="numeric"
        />
        <TouchableOpacity onPress={handleSubmit} style={styles.btn}>
          <Text style={styles.btnText}>Submit</Text>
        </TouchableOpacity>
        <Text>{passage}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    margin: 8,
    fontSize: 48,
    backgroundColor: "#9bf",
    color: "#000",
    borderRadius: 6,
  },
  btn: { margin: 5, padding: 10 },
  btnText: { fontSize: 56 },
});

export default Read;
