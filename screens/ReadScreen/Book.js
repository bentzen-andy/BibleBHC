import React, { useState } from "react";
import { ListItem } from "react-native-elements";

import BibleChapterList from "./BibleChapterList";

const Book = ({ book, numChapters, setBook, setChapter, setIsVisible }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <ListItem.Accordion
      content={
        <ListItem.Content>
          <ListItem.Title style={expanded && { fontWeight: "bold" }}>
            {book}
          </ListItem.Title>
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
        expanded={expanded}
      />
    </ListItem.Accordion>
  );
};

export default Book;
