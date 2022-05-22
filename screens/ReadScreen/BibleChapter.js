import React, { useState, useEffect } from "react";
import { Text, SafeAreaView, ScrollView, StyleSheet } from "react-native";

const BibleChapter = ({ book, chapter, route }) => {
  const [passage, setPassage] = useState("");

  useEffect(() => {
    if (route) {
      lookUpPassage(route.params.book, route.params.chapter);
    } else {
      lookUpPassage(book, chapter);
    }
  }, [book, chapter]);

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
        <Text style={styles.bibleText}>{passage}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bibleText: { fontSize: 20 },
});

export default BibleChapter;
