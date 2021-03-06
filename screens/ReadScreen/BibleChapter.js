import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Toast from "react-native-root-toast";
import { AntDesign } from "@expo/vector-icons";
import { BIBLE } from "../../data/bible";
import { getBibleChapterESV } from "../../helpers/getBibleChapterESV";
import { getBibleChapterNLT } from "../../helpers/getBibleChapterNLT";
import { getStoredValue, setStoredValue } from "../../helpers/async-storage";
import BibleChapterHeaderLeft from "./BibleChapterHeaderLeft";
import BerkleyLogoHeaderRight from "./BerkleyLogoHeaderRight";

// This component displays the Bible text, and provides a few buttons
// to navigate to other chapters.

// This component basically handles three different things:
// 1. It calls up to the ESV API to go get the requested Bible passage.
// 2. It handles three buttons to allow the user to change to a new book/chapter.
// 3. It understands whether or not the user is currently working on an assigned
//    reading via the PlanScreen. If so, it uses a few extra functions to update
//    the reader's progress by tracking the completed readings in local storage.
const BibleChapter = ({
  book,
  chapter,
  bibleVersion,
  assignedReadings,
  setBook,
  setChapter,
  planId,
  route,
  navigation,
  setIsVisible,
  setBibleVersionListIsVisible,
}) => {
  const [passage, setPassage] = useState("");
  const [completedReadings, setCompletedReadings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [scrollTimerId, setScrollTimerId] = useState(null);

  const scrollRef = useRef(null);
  const buttonLeftRef = useRef(null);
  const buttonRightRef = useRef(null);

  useEffect(() => {
    navigation.setOptions({
      headerTitleStyle: {
        opacity: 0,
      },
    });
  });

  // Places button / text at the header
  // If the user is currently reading as part of the reading plan,
  // then there is not button to change to a different chapter. Chapter
  // navigations are handled by the "next" and "prev" buttons the bottom of
  // the screen.
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <BibleChapterHeaderLeft
          assignedReadings={assignedReadings}
          setIsVisible={setIsVisible}
          setBibleVersionListIsVisible={setBibleVersionListIsVisible}
          book={book}
          chapter={chapter}
          bibleVersion={bibleVersion}
          navigation={navigation}
        />
      ),
      headerRight: () => (
        <BerkleyLogoHeaderRight
          assignedReadings={assignedReadings}
          book={book}
          chapter={chapter}
        />
      ),
    });
  });

  // Looks up the passage (conditionally, based on where the component routed from).
  useEffect(() => {
    if (route?.params.book && route?.params.chapter) {
      lookUpPassage(route.params.book, route.params.chapter);
      scrollRef.current.scrollTo({ x: 0, y: 0, animated: true });
    } else {
      lookUpPassage(book, chapter);
      scrollRef.current.scrollTo({ x: 0, y: 0, animated: true });
    }
  }, [book, chapter, bibleVersion, route?.params]);

  // Checks if the user has finished their assigned readings (if they are currently
  // in a reading plan).
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
        // navigation.navigate("ReadingPlansAll");
        navigation.goBack();
      }, 2000);
    }
  }, [completedReadings]);

  // See comment for "advanceBibleChapterRight()" This component navigates back instead of forward.
  function advanceBibleChapterLeft() {
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

      setStoredValue(`${planId}${book}${chapter}`);
      setBook(prevBook);
      setChapter(prevChapter);
      lookUpPassage(prevBook, prevChapter);
      scrollRef.current.scrollTo({ x: 0, y: 0, animated: true });
      setAssignedReadingCompletion();
      return;
    }

    let chapterNumber = +chapter;
    let index = +BIBLE.filter((bk) => bk.book === book)[0].id;
    let prevBook;
    let prevChapter;

    // if first chapter in book or in Bible
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
    scrollRef.current.scrollTo({ x: 0, y: 0, animated: true });
  }

  // Handles the button to display the next chapter.
  // Note: if a reading plan is active, this will bring the reader to the next chapter
  // in the reading plan, not necessarily the chapter that follows the current chapter.
  function advanceBibleChapterRight() {
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

      setStoredValue(`${planId}${book}${chapter}`);
      setAssignedReadingCompletion();
      setBook(nextBook);
      setChapter(nextChapter);
      lookUpPassage(nextBook, nextChapter);
      scrollRef.current.scrollTo({ x: 0, y: 0, animated: true });
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
    scrollRef.current.scrollTo({ x: 0, y: 0, animated: true });
  }

  // Pulls down the bible text from the API.
  function lookUpPassage(book, chapter) {
    setIsLoading(true);
    if (bibleVersion === "NLT") {
      book = book === "Song of Solomon" ? "Song of Songs" : book;
      getBibleChapterNLT(book, chapter).then((text) => setPassage(text));
    }
    if (bibleVersion === "ESV") {
      getBibleChapterESV(book, chapter).then((text) => setPassage(text));
    }
  }

  // Checks all the daily readings in the current plan to see which of they have
  // already been read. It then stores the completed readings in the component's state
  // via a callback function.
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
          arr = arr.filter((element) => element !== null);
          return arr;
        });
      })
    );
  }

  return (
    <SafeAreaView>
      <ScrollView
        ref={scrollRef}
        bounces
        onScrollBeginDrag={() => {
          clearTimeout(scrollTimerId);
          buttonLeftRef.current?.setNativeProps({ style: { color: "#eeea" } });
          buttonRightRef.current?.setNativeProps({ style: { color: "#eeea" } });
        }}
        onScrollEndDrag={() => {
          let scrollTimerId = setTimeout(() => {
            buttonLeftRef.current?.setNativeProps({ style: { color: "#444" } });
            buttonRightRef.current?.setNativeProps({
              style: { color: "#444" },
            });
          }, 1500);
          setScrollTimerId(scrollTimerId);
        }}
      >
        <Text style={styles.bibleText}>
          {typeof passage !== "object" && passage}
        </Text>
      </ScrollView>
      <TouchableOpacity
        style={[styles.button, styles.buttonLeft]}
        onPress={() => {
          advanceBibleChapterLeft();
        }}
      >
        <AntDesign
          name="leftcircleo"
          style={styles.buttonText}
          ref={buttonLeftRef}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.buttonRight]}
        onPress={() => {
          advanceBibleChapterRight();
        }}
      >
        <AntDesign
          name="rightcircleo"
          style={styles.buttonText}
          ref={buttonRightRef}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 50,
    backgroundColor: "#eeea",
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 48,
    color: "#444",
  },
  buttonLeft: { left: 50 },
  buttonRight: { right: 50 },
  bibleText: { fontSize: 24, lineHeight: 36, margin: 16 },
});

export default BibleChapter;
