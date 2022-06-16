import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import BottomSheet from "react-native-simple-bottom-sheet";

import BibleChapter from "./BibleChapter";
import BibleBookList from "./BibleBookList";

// This component is the heart of the application. This is the Bible
// screen, with the text in the main part of the screen and a button
// in the corner to look up a book/chapter.

// The user can route to this screen via the Tab navigator at the root
// of the app, or via the PlanScreen if the user picks one of the daily
// readings. If the user navigate by way of the Bible tab, then it will
// default to page 1 of the Bible (Genesis ch 1). Otherwise if they come
// from the PlanScreen, then this component will look up that reading's
// book/chapter via the navigation object.
const ReadScreen = ({ navigation, route }) => {
  const [book, setBook] = useState("Genesis");
  const [chapter, setChapter] = useState("1");
  const [assignedReadings, setAssignedReadings] = useState(null);
  const [planId, setPlanId] = useState("");

  const panelRef = useRef(null);

  // Gets the book/chapter/plan info if the user navigated here from
  // the PlanScreen.
  useEffect(() => {
    if (route.params?.book && route.params?.chapter) {
      setBook(route.params.book);
      setChapter(route.params.chapter);
    }
    if (route.params?.assignedReadings) {
      setAssignedReadings(route.params.assignedReadings);
      setPlanId(route.params.planId);
    }
  }, [route?.params]);

  return (
    <View style={styles.container}>
      <View style={styles.bibleText}>
        <BibleChapter
          book={book}
          chapter={chapter}
          navigation={navigation}
          assignedReadings={assignedReadings}
          setBook={setBook}
          setChapter={setChapter}
          planId={planId}
          panelRef={panelRef}
        />
      </View>
      <View>
        <BottomSheet
          isOpen={false}
          sliderMinHeight={0}
          sliderMaxHeight={Dimensions.get("window").height * 0.8}
          ref={(ref) => (panelRef.current = ref)}
        >
          <BibleBookList
            setBook={setBook}
            setChapter={setChapter}
            panelRef={panelRef}
          />
        </BottomSheet>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  bibleText: { height: "100%" },
});
export default ReadScreen;
