import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { CheckBox, ListItem } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";

import FlatListItemSeparator from "./FlatListItemSeparator";

// This component is a checklist for the day's readings.
// As the user reads the chapters, in the reading plan list,
// they will be checked off the list by storing the completion
// status in local phone storage.
const ReadingPlanReadings = ({ navigation, route }) => {
  const readings = route.params.item;
  const planId = route.params.id;
  const [checked, setChecked] = useState([]);

  // Every reading in the reading plans is uniquely identified in
  // the phone's local storage. This function checks to see if the
  // readings on this list have been previously read by the user.
  // If so, they will render with a check mark, else, no check mark.
  useEffect(() => {
    let readingIds = readings.map(
      (reading) => `${planId}${reading.book}${reading.chapter}`
    );
    getCompletedReadings(readingIds);
  });

  // Checks local storage to see which readings have already been read.
  async function getCompletedReadings(readingIds) {
    try {
      let arr = [];
      for (const id of readingIds) {
        const value = await AsyncStorage.getItem(`@${id}`);
        arr.push(value);
      }
      setChecked(arr);
    } catch (err) {
      console.log(err);
    }
  }

  // Toggles the check mark for a reading by checking the status in
  // local storage and then setting it's status to the opposite.
  async function toggleCompletedReading(value) {
    try {
      const retrievedVal = await AsyncStorage.getItem(`@${value}`);
      if (retrievedVal != null) {
        await AsyncStorage.removeItem(`@${value}`);
      } else {
        await AsyncStorage.setItem(`@${value}`, value);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const renderReading = ({ index, item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ReadScreen", {
            book: item.book,
            chapter: item.chapter,
            assignedReadings: readings,
            assignedReadingIndex: index,
            planId,
          })
        }
      >
        <ListItem key={index}>
          <CheckBox
            checked={checked.includes(`${planId}${item.book}${item.chapter}`)}
            onPress={() => {
              toggleCompletedReading(`${planId}${item.book}${item.chapter}`);
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
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 4,
    paddingTop: 10,
    backgroundColor: "#eee",
  },
});

export default ReadingPlanReadings;
