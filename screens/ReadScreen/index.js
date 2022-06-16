import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import BottomSheet from "react-native-simple-bottom-sheet";

import BibleChapter from "./BibleChapter";
import BibleBookList from "./BibleBookList";

const ReadScreen = ({ navigation, route }) => {
  const [book, setBook] = useState("Genesis");
  const [chapter, setChapter] = useState("1");
  const [assignedReadings, setAssignedReadings] = useState(null);
  const [planId, setPlanId] = useState("");

  const panelRef = useRef(null);

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
      <View style={{ height: "100%" }}>
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
});
export default ReadScreen;
