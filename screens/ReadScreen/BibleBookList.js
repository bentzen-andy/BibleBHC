import React from "react";
import { Text, View, FlatList, StyleSheet } from "react-native";

import BibleChapterList from "./BibleChapterList";

import { BIBLE } from "../../data/bible";

const BibleBookList = ({ setBook, setChapter, panelRef }) => {
  const renderBook = ({ item }) => {
    return (
      <View>
        <View>
          <Text style={styles.bibleBookText}>{item.book}</Text>
        </View>
        <View style={{ flex: 1, flexDirection: "row" }}>
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
});

export default BibleBookList;
