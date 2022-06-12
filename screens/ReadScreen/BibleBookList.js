import React from "react";
import {
  Text,
  View,
  ScrollView,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import BibleChapterList from "./BibleChapterList";

import { BIBLE } from "../../data/bible";

const BibleBookList = ({ setBook, setChapter, panelRef }) => {
  return (
    <View>
      <FlatList
        data={BIBLE}
        keyExtractor={(item) => item.book}
        renderItem={({ item }) => {
          return (
            <View style={{ flex: 1, flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => {
                  //   setBook(item.book);
                  //   panelRef.current.togglePanel();
                }}
              >
                <Text style={styles.bibleBookText}>{item.book}</Text>
                <BibleChapterList
                  book={item.book}
                  numChapters={item.numChapters}
                  setBook={setBook}
                  setChapter={setChapter}
                  panelRef={panelRef}
                />
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bibleBookText: { fontSize: 18 },
});

export default BibleBookList;
