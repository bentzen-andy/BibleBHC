import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import BibleChapter from "./BibleChapter";
import BibleBookList from "./BibleBookList";

import BottomSheet from "react-native-simple-bottom-sheet";

const Read = ({ navigation, route }) => {
  const [book, setBook] = useState("Genesis");
  const [chapter, setChapter] = useState("1");
  const panelRef = useRef(null);

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

  return (
    <View>
      <BibleChapter book={book} chapter={chapter} />
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

const styles = StyleSheet.create({
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
export default Read;
