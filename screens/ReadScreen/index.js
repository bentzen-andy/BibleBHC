import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { BottomSheet, ListItem } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { BIBLE } from "../../data/bible";

import Book from "./Book";
import BibleChapter from "./BibleChapter";

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
  const [isVisible, setIsVisible] = useState(false);

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
    <SafeAreaView style={styles.container}>
      <View style={styles.bibleText}>
        <BibleChapter
          book={book}
          chapter={chapter}
          navigation={navigation}
          assignedReadings={assignedReadings}
          setBook={setBook}
          setChapter={setChapter}
          planId={planId}
          setIsVisible={setIsVisible}
        />
      </View>
      <View>
        <BottomSheet
          isVisible={isVisible}
          style={{ marginTop: 50, backgroundColor: "#fff" }}
        >
          <ListItem
            key={0}
            onPress={() => setIsVisible(false)}
            containerStyle={{
              backgroundColor: "#eee",
              borderBottomWidth: 1,
            }}
          >
            <ListItem.Content>
              <ListItem.Title>
                <AntDesign name="close" size={24} color="black" />
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>

          {BIBLE.map((item) => (
            <Book
              key={item.book}
              book={item.book}
              numChapters={item.numChapters}
              setBook={setBook}
              setChapter={setChapter}
              setIsVisible={setIsVisible}
            />
          ))}
        </BottomSheet>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  bibleText: { height: "100%" },
});
export default ReadScreen;
