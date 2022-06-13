import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import BibleChapter from "./BibleChapter";
import BibleBookList from "./BibleBookList";

import BottomSheet from "react-native-simple-bottom-sheet";

const ReadScreen = ({ navigation, route }) => {
  const [book, setBook] = useState("Genesis");
  const [chapter, setChapter] = useState("1");
  const [assignedReadings, setAssignedReadings] = useState(null);
  const [assignedReadingIndex, setAssignedReadingIndex] = useState(0);
  const [planId, setPlanId] = useState("");

  const panelRef = useRef(null);

  // console.log("----route");
  // console.log(route);
  // console.log("----book");
  // console.log(book);
  // console.log("----chapter");
  // console.log(chapter);
  // console.log("----assignedReadings");
  // console.log(assignedReadings);
  // console.log("----assignedReadingIndex");
  // console.log(assignedReadingIndex);
  // console.log("----planId");
  // console.log(planId);

  useEffect(() => {
    if (route.params?.book && route.params?.chapter) {
      setBook(route.params.book);
      setChapter(route.params.chapter);
    }
    if (route.params?.assignedReadings) {
      setAssignedReadings(route.params.assignedReadings);
      setAssignedReadingIndex(route.params.assignedReadingIndex);
      setPlanId(route.params.planId);
    }
  }, [route?.params]);

  return (
    <View>
      <BibleChapter
        book={book}
        chapter={chapter}
        navigation={navigation}
        assignedReadings={assignedReadings}
        assignedReadingIndex={assignedReadingIndex}
        planId={planId}
        panelRef={panelRef}
      />
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
  );
};

export default ReadScreen;
