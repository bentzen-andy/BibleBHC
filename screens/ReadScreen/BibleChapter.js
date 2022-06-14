import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-root-toast";
import { ESV_API_KEY } from "../../api/esv-credentials";
import { BIBLE } from "../../data/bible";

const BibleChapter = ({
  book,
  chapter,
  assignedReadings,
  setBook,
  setChapter,
  planId,
  route,
  navigation,
  panelRef,
}) => {
  const [passage, setPassage] = useState("");
  const [completedReadings, setCompletedReadings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const scrollRef = useRef(null);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => panelRef.current.togglePanel()}>
            <Text style={styles.headerLeftText}>
              {book} {chapter}
            </Text>
          </TouchableOpacity>
        </View>
      ),
    });
  });

  useEffect(() => {
    if (route?.params.book && route?.params.chapter) {
      lookUpPassage(route.params.book, route.params.chapter);
    } else {
      lookUpPassage(book, chapter);
    }
  }, [book, chapter, route?.params]);

  useEffect(() => {
    if (
      assignedReadings &&
      completedReadings.every((element) => element) &&
      assignedReadings.length === completedReadings.length
    ) {
      Toast.show("Daily reading complete!", {
        duration: Toast.durations.LONG,
        animation: true,
        hideOnPress: true,
      });
      setTimeout(() => {
        navigation.navigate("ReadingPlanList", {
          item: assignedReadings,
          planId: planId,
        });
      }, 1500);
    }
  }, [completedReadings]);

  function advanceLeft() {
    if (assignedReadings) {
      let index;
      assignedReadings.map((item, i) => {
        if (item.book === book && item.chapter === chapter) {
          index = i;
        }
      });
      index--;
      if (index < 0) index++;
      let prevBook = assignedReadings[index].book;
      let prevChapter = assignedReadings[index].chapter;
      setBook(prevBook);
      setChapter(prevChapter);
      lookUpPassage(prevBook, prevChapter);
      setAssignedReadingCompletion();
      return;
    }

    let chapterNumber = +chapter;
    let index = +BIBLE.filter((bk) => bk.book === book)[0].id;
    let prevBook;
    let prevChapter;

    // if last chapter in book or in Bible
    if (book === "Genesis" && chapterNumber === 1) {
      prevBook = "Revelation";
      prevChapter = 22;
    } else if (chapterNumber === 1) {
      prevBook = BIBLE[index - 1].book;
      prevChapter = BIBLE[index - 1].numChapters;
    } else {
      prevBook = book;
      prevChapter = chapterNumber - 1;
    }

    setBook(prevBook);
    setChapter(prevChapter);
    lookUpPassage(prevBook, prevChapter);
  }

  function advanceRight() {
    if (assignedReadings) {
      let index;
      assignedReadings.map((item, i) => {
        if (item.book === book && item.chapter === chapter) {
          index = i;
        }
      });
      index++;
      if (index >= assignedReadings.length) index--;
      let nextBook = assignedReadings[index].book;
      let nextChapter = assignedReadings[index].chapter;

      setBook(nextBook);
      setChapter(nextChapter);
      lookUpPassage(nextBook, nextChapter);
      setCompletedReading(`${planId}${book}${chapter}`);
      setAssignedReadingCompletion();
      return;
    }

    let chapterNumber = +chapter;
    let index = +BIBLE.filter((bk) => bk.book === book)[0].id;
    let nextBook;
    let nextChapter;

    // if last chapter in book or in Bible
    if (book === "Revelation" && chapterNumber === 22) {
      nextBook = "Genesis";
      nextChapter = 1;
    } else if (chapterNumber === BIBLE[index].numChapters) {
      nextBook = BIBLE[index + 1].book;
      nextChapter = 1;
    } else {
      nextBook = book;
      nextChapter = chapterNumber + 1;
    }

    setBook(nextBook);
    setChapter(nextChapter);
    lookUpPassage(nextBook, nextChapter);
  }

  function lookUpPassage(book, chapter) {
    setIsLoading(true);
    fetch(`https://api.esv.org/v3/passage/text/?q=${book}+${chapter}`, {
      headers: {
        Accept: "application/json",
        Authorization: ESV_API_KEY,
      },
    })
      .then((response) => response.json())
      .then((data) => setPassage(data.passages))
      .catch((err) => console.log(err));

    // setIsLoading(true);
    setIsLoading(false);
    scrollRef.current.scrollTo({ x: 5, y: 5, animated: false });
  }

  async function setCompletedReading(value) {
    try {
      await AsyncStorage.setItem(`@${value}`, value);
    } catch (err) {
      console.log(err);
    }
  }

  async function getStoredValue(value, action) {
    try {
      let val = await AsyncStorage.getItem(`@${value}`);
      action(val);
    } catch (err) {
      console.log(err);
    }
  }

  function setAssignedReadingCompletion() {
    let readingIds = assignedReadings.map(
      (item) => `${planId}${item.book}${item.chapter}`
    );
    readingIds.map((id) =>
      getStoredValue(id, (val) => {
        setCompletedReadings((curr) => {
          let arr = [...curr];
          arr.push(val);
          // keep only unique values
          arr = [...new Set(arr)];
          // remove null values
          arr = arr.filter((element) => {
            return element !== null;
          });
          return arr;
        });
      })
    );
  }

  return (
    <SafeAreaView>
      <ScrollView ref={scrollRef}>
        {isLoading && (
          <View style={styles.loading}>
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        )}
        {!isLoading && (
          <Text style={styles.bibleText}>
            {passage}
            {`
            
            
            
            
            



            
            
            
            
            `}
          </Text>
        )}
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
          // width: 300,
          height: 50,
          borderRadius: 25,
        }}
        onPress={() => {
          advanceLeft();
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
          // width: 300,
          height: 50,
          borderRadius: 25,
        }}
        onPress={() => {
          advanceRight();
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
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // height: 1000,
  },
  loadingText: { flex: 1, fontSize: 20, margin: 16 },
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
