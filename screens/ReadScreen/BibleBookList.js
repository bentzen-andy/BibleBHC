import React from "react";
import { Text, View, FlatList, StyleSheet } from "react-native";
import { BIBLE } from "../../data/bible";

import BibleChapterList from "./BibleChapterList";

// This component is a simple listing of the books of the Bible.
// This list of books goes in a slider that the user can summon
// by pressing a button.
const BibleBookList = ({ setBook, setChapter, panelRef }) => {
  const renderBook = ({ item }) => {
    return (
      <View>
        <View>
          <Text style={styles.bibleBookText}>{item.book}</Text>
        </View>
        <View style={styles.bibleChapterList}>
          <BibleChapterList
            book={item.book}
            numChapters={item.numChapters}
            setBook={setBook}
            setChapter={setChapter}
            panelRef={panelRef}
          />
        </View>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={BIBLE}
        keyExtractor={(item) => item.book}
        renderItem={renderBook}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bibleBookText: { fontSize: 18 },
  bibleChapterList: { flex: 1, flexDirection: "row" },
});

export default BibleBookList;
