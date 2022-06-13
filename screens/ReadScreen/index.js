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
  const panelRef = useRef(null);

  return (
    <View>
      <BibleChapter
        book={book}
        chapter={chapter}
        navigation={navigation}
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
