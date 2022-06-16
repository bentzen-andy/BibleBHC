import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

const BibleChapterList = ({
  book,
  numChapters,
  setBook,
  setChapter,
  panelRef,
}) => {
  return (
    <View>
      <View style={styles.chapters}>
        {[...Array(numChapters)].fill("").map((item, i) => (
          <TouchableOpacity
            key={`${book}${i}`}
            onPress={() => {
              setBook(book);
              setChapter(i + 1);
              panelRef.current.togglePanel();
            }}
          >
            <View style={styles.chapterContainer}>
              <Text style={styles.chapterText}> {i + 1}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chapters: { flex: 1, flexDirection: "row", flexWrap: "wrap" },
  chapterContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#000",
    borderWidth: 1,
    width: 40,
    height: 40,
    margin: 4,
  },
  chapterText: { fontSize: 16 },
});

export default BibleChapterList;
