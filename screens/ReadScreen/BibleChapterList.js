import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

// This component is a listing of chapter buttons that the user can
// tap on the call up a new chapter.
const BibleChapterList = ({
  book,
  numChapters,
  setBook,
  setChapter,
  setIsVisible,
}) => {
  return (
    <View style={styles.chapters}>
      {[...Array(numChapters)].fill("").map((item, i) => (
        <TouchableOpacity
          key={`${book}${i}`}
          onPress={() => {
            setBook(book);
            setChapter(i + 1);
            setIsVisible(false);
          }}
        >
          <View style={styles.chapterContainer}>
            <Text style={styles.chapterText}> {i + 1}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  chapters: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#fff",
  },
  chapterContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#000",
    backgroundColor: "#fff",
    borderWidth: 1,
    width: 40,
    height: 40,
    margin: 4,
  },
  chapterText: { fontSize: 16 },
});

export default BibleChapterList;
