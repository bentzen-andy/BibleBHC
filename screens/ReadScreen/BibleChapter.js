import React, { useState, useEffect } from "react";
import { Text, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { ESV_API_KEY } from "../../api/esv-credentials";

const BibleChapter = ({ book, chapter, route }) => {
  const [passage, setPassage] = useState("");

  useEffect(() => {
    if (route) {
      lookUpPassage(route.params.book, route.params.chapter);
    } else {
      lookUpPassage(book, chapter);
    }
    // lookUpPassage(book, chapter);
  }, [book, chapter]);

  const lookUpPassage = (book, chapter) => {
    fetch(`https://api.esv.org/v3/passage/text/?q=${book}+${chapter}`, {
      headers: {
        Accept: "application/json",
        Authorization: ESV_API_KEY,
      },
    })
      .then((response) => response.json())
      .then((data) => setPassage(data.passages));
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <Text style={styles.bibleText}>{passage}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bibleText: { fontSize: 20, margin: 16 },
});

export default BibleChapter;
