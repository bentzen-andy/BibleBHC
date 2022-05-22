import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import BibleChapter from "./BibleChapter";

const Read = () => {
  const [enteredBook, setEnteredBook] = useState("");
  const [enteredChapter, setEnteredChapter] = useState("");
  const [book, setBook] = useState("");
  const [chapter, setChapter] = useState("");

  const handleSubmit = () => {
    setBook(enteredBook);
    setChapter(enteredChapter);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <Text style={{ fontSize: 36 }}>Book:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setEnteredBook}
          value={enteredBook}
        />

        <Text style={{ fontSize: 36 }}>Chapter:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setEnteredChapter}
          value={enteredChapter}
          keyboardType="numeric"
        />
        <TouchableOpacity onPress={handleSubmit} style={styles.btn}>
          <Text style={styles.btnText}>Submit</Text>
        </TouchableOpacity>
        <BibleChapter book={book} chapter={chapter} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    margin: 8,
    fontSize: 48,
    backgroundColor: "#bbb",
    color: "#000",
    borderRadius: 6,
  },
  btn: {
    margin: 5,
    padding: 10,
    backgroundColor: "#82d8f7",
    borderRadius: 10,
    width: 200,
  },
  btnText: { fontSize: 36 },
});

export default Read;
