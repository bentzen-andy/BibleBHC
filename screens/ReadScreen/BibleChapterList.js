import React from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

// This component is a listing of chapter buttons that the user can
// tap on the call up a new chapter.
const BibleChapterList = ({
  book,
  numChapters,
  setBook,
  setChapter,
  setIsVisible,
  expanded,
}) => {
  // Optimization to keep the slider from rendering every chapter button
  if (!expanded) return <View />;

  return (
    <ScrollView>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  chapters: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#fff",
    margin: 10,
  },
  chapterContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#999",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 3,
    width: 30,
    height: 30,
    margin: 6,
  },
  chapterText: { fontSize: 16 },
});

export default BibleChapterList;
