import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { ESV_API_KEY } from "../../api/esv-credentials";
import { BIBLE } from "../../data/bible";

const BibleChapter = ({ book, chapter, route, navigation, panelRef }) => {
  const [passage, setPassage] = useState("");
  const [currBook, setCurrBook] = useState("");
  const [currChapter, setCurrChapter] = useState("");

  // const [prevPassage, setPrevPassage] = useState("");
  // const [nextPassage, setNextPassage] = useState("");
  const [prevBook, setPrevBook] = useState("");
  const [nextBook, setNextBook] = useState("");
  const [prevChapter, setPrevChapter] = useState("");
  const [nextChapter, setNextChapter] = useState("");

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => panelRef.current.togglePanel()}>
            <Text style={styles.headerLeftText}>
              {currBook === ""
                ? `${book} ${chapter}`
                : `${currBook} ${currChapter}`}
            </Text>
          </TouchableOpacity>
        </View>
      ),
    });
  });

  useEffect(() => {
    if (route) {
      // setCurrBook(route.params.book);
      // setCurrChapter(route.params.chapter);
      lookUpPassage(route.params.book, route.params.chapter);
    } else {
      // setCurrBook(book);
      // setCurrChapter(chapter);
      lookUpPassage(book, chapter);
    }
  }, [book, chapter, route]);

  const lookUpPassage = (book, chapter) => {
    fetch(`https://api.esv.org/v3/passage/text/?q=${book}+${chapter}`, {
      headers: {
        Accept: "application/json",
        Authorization: ESV_API_KEY,
      },
    })
      .then((response) => response.json())
      .then((data) => setPassage(data.passages))
      .then(() => setCurrBook(book))
      .then(() => setCurrChapter(chapter))
      .then(() => findPrevPassage(book, chapter))
      .then(() => findNextPassage(book, chapter));
  };

  const findPrevPassage = (book, chapter) => {
    let chapterNumber = +chapter;
    let index = +BIBLE.filter((bk) => bk.book === book)[0].id;
    // if first chapter in book or in Bible
    if (book === "Genesis" && chapterNumber === 1) {
      setPrevBook("Revelation");
      setPrevChapter("22");
    } else if (chapterNumber === 1) {
      console.log(`chapter === "1"`);
      setPrevChapter(BIBLE[index - 1].numChapters);
      setPrevBook(BIBLE[index - 1].book);
    } else {
      setPrevChapter(chapterNumber - 1);
      setPrevBook(book);
    }
  };

  const findNextPassage = (book, chapter) => {
    let chapterNumber = +chapter;
    let index = +BIBLE.filter((bk) => bk.book === book)[0].id;
    // if last chapter in book or in Bible
    if (book === "Revelation" && chapterNumber === 22) {
      setNextBook("Genesis");
      setNextChapter("1");
    } else if (chapterNumber === BIBLE[index].numChapters) {
      console.log(`chapter === BIBLE[index].numChapters`);
      setNextChapter(1);
      setNextBook(BIBLE[index + 1].book);
    } else {
      setNextChapter(chapterNumber + 1);
      setNextBook(book);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <Text style={styles.bibleText}>{passage}</Text>
      </ScrollView>
      <TouchableOpacity
        style={{
          position: "absolute",
          left: 50,
          bottom: 50,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 1,
          // padding: 20,
          backgroundColor: "#555",
          width: 50,
          height: 50,
          borderRadius: 25,
        }}
        onPress={() => {
          lookUpPassage(prevBook, prevChapter);
          setCurrBook(prevBook);
          setCurrChapter(prevChapter);
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: "#fff",
          }}
        >
          {"<"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          position: "absolute",
          right: 50,
          bottom: 50,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 1,
          // padding: 20,
          backgroundColor: "#555",
          width: 50,
          height: 50,
          borderRadius: 25,
        }}
        onPress={() => {
          lookUpPassage(nextBook, nextChapter);
          setCurrBook(nextBook);
          setCurrChapter(nextChapter);
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: "#fff",
          }}
        >
          {">"}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bibleText: { fontSize: 20, margin: 16 },
  headerLeft: {
    marginLeft: 5,
    borderColor: "#ddd",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 24,
    backgroundColor: "#ddd",
  },
  headerLeftText: { fontWeight: "bold" },
});

export default BibleChapter;
