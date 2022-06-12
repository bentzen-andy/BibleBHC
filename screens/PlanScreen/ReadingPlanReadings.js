import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { CheckBox, ListItem } from "react-native-elements";

const ReadingPlanReadings = ({ navigation, route }) => {
  const readings = route.params;
  const [checked, setChecked] = useState(false);

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#000",
        }}
      />
    );
  };

  const renderReading = ({ index, item }) => {
    console.log("item");
    console.log(item.book);
    console.log("----");

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("BibleChapter", {
            book: item.book,
            chapter: item.chapter,
          })
        }
      >
        <ListItem key={index}>
          <CheckBox
            checked={checked}
            onPress={() => {
              setChecked((state) => !state);
            }}
          />
          <ListItem.Content>
            <ListItem.Title>
              {item.book} {item.chapter}
            </ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.screen}>
      <FlatList
        style={styles.screen}
        keyExtractor={(item) => `${item.book}-${item.chapter}`}
        data={readings}
        ItemSeparatorComponent={FlatListItemSeparator}
        renderItem={renderReading}
      />

      {/* {readings.map((reading) => (
        <Button
          key={`${reading.book}${reading.chapter}`}
          title={`[ ] ${reading.book} ${reading.chapter}`}
          onPress={() =>
            navigation.navigate("BibleChapter", {
              book: reading.book,
              chapter: reading.chapter,
            })
          }
        />
      ))} */}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 4,
    paddingTop: 10,
    backgroundColor: "#E8EAF6",
  },
});

export default ReadingPlanReadings;
