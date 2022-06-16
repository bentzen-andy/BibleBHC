import react, { useState } from "react";
import { StyleSheet, Text, View, Dimensions, SafeAreaView } from "react-native";
import { BottomSheet, Button, ListItem } from "react-native-elements";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { BIBLE } from "../../data/bible";
import BibleChapterList from "./BibleChapterList";

const Book = ({ book, numChapters, setBook, setChapter, setIsVisible }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <ListItem.Accordion
      content={
        <ListItem.Content>
          <ListItem.Title>{book}</ListItem.Title>
        </ListItem.Content>
      }
      containerStyle={{ backgroundColor: "#fff" }}
      isExpanded={expanded}
      onPress={() => {
        setExpanded(!expanded);
      }}
    >
      <BibleChapterList
        book={book}
        numChapters={numChapters}
        setBook={setBook}
        setChapter={setChapter}
        setIsVisible={setIsVisible}
      />
    </ListItem.Accordion>
  );
};

export default Book;
