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
import { AntDesign } from "@expo/vector-icons";
import { ESV_API_KEY } from "../../helpers/esv-credentials";
import { BIBLE } from "../../data/bible";
import { sup, sub } from "subsup";

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
  assignedReadings,
  setBook,
  setChapter,
  planId,
  route,
  navigation,
  setIsVisible,
}) => {
  const [passage, setPassage] = useState("");
  const [completedReadings, setCompletedReadings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [scrollTimerId, setScrollTimerId] = useState(null);

  const scrollRef = useRef(null);
  const buttonLeftRef = useRef(null);
  const buttonRightRef = useRef(null);

  // formate the chapter numbers with superscript
  let formattedPassage = passage
    .split(" ")
    .map((word) => (word.match(/[[0-9]*]/) ? sup(word) : word))
    .join(" ");

  // formate the footnote numbers with subscript
  formattedPassage = formattedPassage
    .split(" ")
    .map((word) =>
      word.match(/\([0-9]*\)/)
        ? `${word.replace(/\([0-9]*\)/, "")}${sub(word)}`
        : word
    )
    .join(" ");

  // Places button / text at the header
  // If the user is currently reading as part of the reading plan,
  // then there is not button to change to a different chapter. Chapter
  // navigations are handled by the "next" and "prev" buttons the bottom of
  // the screen.
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View>
          {assignedReadings && (
            <View style={styles.headerLeftPlanReading}>
              <Text style={styles.headerLeftText}>
                Plan Reading: {getPlanReadingIndex() + 1} of{" "}
                {assignedReadings.length}
              </Text>
              <Text style={styles.headerLeftText}>
                {book} {chapter}
              </Text>
            </View>
          )}
          {!assignedReadings && (
            <View style={styles.headerLeft}>
              <TouchableOpacity onPress={() => setIsVisible(true)}>
                <Text style={styles.headerLeftText}>
                  {book} {chapter}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ),
    });
  });

  // Looks up the passage (conditionally, based on where the component routed from).
  useEffect(() => {
    if (route?.params.book && route?.params.chapter) {
      lookUpPassage(route.params.book, route.params.chapter);
    } else {
      lookUpPassage(book, chapter);
    }
  }, [book, chapter, route?.params]);

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
        navigation.navigate("ReadingPlanList", {
          item: assignedReadings,
          planId: planId,
        });
      }, 2000);
    }
  }, [completedReadings]);

  // See comment for "advanceRight()" This component navigates back instead of forward.
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

      setCompletedReading(`${planId}${book}${chapter}`);
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
  }

  // Handles the button to display the next chapter.
  // Note: if a reading plan is active, this will bring the reader to the next chapter
  // in the reading plan, not necessarily the chapter that follows the current chapter.
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

      setCompletedReading(`${planId}${book}${chapter}`);
      setAssignedReadingCompletion();
      setBook(nextBook);
      setChapter(nextChapter);
      lookUpPassage(nextBook, nextChapter);
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

  // The current reading plan will be stored in an array. This helper function
  // determines which index of the reading plan array we are currently on based
  // on which book/chapter is actively displayed.
  function getPlanReadingIndex() {
    let index;
    assignedReadings.map((item, i) => {
      if (item.book === book && item.chapter === chapter) {
        index = i;
      }
    });
    return index;
  }

  // The ESV handles single-chapter books differently for it's required API
  // query string. You have to omit chapter argument in the request, otherwise
  // it will only give you the first verse of chapter 1.
  function hasOnlyOneChapter(book) {
    return BIBLE.filter((item) => item.book === book)[0].numChapters === 1;
  }

  // Pulls down the bible text from the API.
  function lookUpPassage(book, chapter) {
    setIsLoading(true);

    // The API treats single-chapter books differently.
    let theChapter = hasOnlyOneChapter(book) ? "" : chapter;

    fetch(`https://api.esv.org/v3/passage/text/?q=${book}+${theChapter}`, {
      headers: {
        Accept: "application/json",
        Authorization: ESV_API_KEY,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        let lines = data.passages[0].split("\n");
        lines.splice(0, 2);
        return lines.join("\n");
      })
      .then((text) => setPassage(text))
      .catch((err) => console.log(err));

    // setIsLoading(true);
    setIsLoading(false);
    scrollRef.current.scrollTo({ x: 0, y: 0, animated: true });
  }

  // Stores a reading ID in local storage so that the plan checklist
  // can show it as read
  async function setCompletedReading(value) {
    try {
      await AsyncStorage.setItem(`@${value}`, value);
    } catch (err) {
      console.log(err);
    }
  }

  // Checks in local storage whether a particular reading has been read.
  async function getStoredValue(value, action) {
    try {
      let val = await AsyncStorage.getItem(`@${value}`);
      action(val);
    } catch (err) {
      console.log(err);
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
          buttonLeftRef.current.setNativeProps({ style: { color: "#eeea" } });
          buttonRightRef.current.setNativeProps({ style: { color: "#eeea" } });
        }}
        onScrollEndDrag={() => {
          let scrollTimerId = setTimeout(() => {
            buttonLeftRef.current.setNativeProps({ style: { color: "#444" } });
            buttonRightRef.current.setNativeProps({ style: { color: "#444" } });
          }, 1500);
          setScrollTimerId(scrollTimerId);
        }}
      >
        <Text style={styles.bibleText}>
          {isLoading ? "Loading..." : formattedPassage}
        </Text>
      </ScrollView>
      <TouchableOpacity
        style={[styles.button, styles.buttonLeft]}
        onPress={() => {
          advanceLeft();
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
          advanceRight();
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
  headerLeftPlanReading: {
    marginLeft: 5,
    borderColor: "#fff",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 24,
    backgroundColor: "#fff",
  },
  headerLeftText: { fontWeight: "bold" },
});

export default BibleChapter;
