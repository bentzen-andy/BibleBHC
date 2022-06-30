import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { CheckBox, ListItem } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getStoredValue,
  setStoredValue,
  getMultipleStoredValues,
  toggleStoredValue,
} from "../../helpers/async-storage";

import FlatListItemSeparator from "./FlatListItemSeparator";

const Readings = ({ navigation, readings, planId }) => {
  const [checked, setChecked] = useState([]);
  // this is a real hacky solution, but it helps prevent the
  // component from re-rendering infinitely
  const [asyncStorageDidChange, setAsyncStorageDidChange] = useState(false);

  // Every reading in the reading plans is uniquely identified in
  // the phone's local storage. This function checks to see if the
  // readings on this list have been previously read by the user.
  // If so, they will render with a check mark, else, no check mark.
  useEffect(() => {
    let readingIds = readings.map(
      (reading) => `${planId}${reading.book}${reading.chapter}`
    );
    getMultipleStoredValues(readingIds, (valueArray) => setChecked(valueArray));
  }, [asyncStorageDidChange, readings]);

  const renderReading = ({ index, item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("ReadScreen", {
            book: item.book,
            chapter: item.chapter,
            assignedReadings: readings,
            assignedReadingIndex: index,
            planId,
          });
        }}
      >
        <ListItem key={index}>
          <CheckBox
            checked={checked.includes(`${planId}${item.book}${item.chapter}`)}
            onPress={() => {
              toggleStoredValue(`${planId}${item.book}${item.chapter}`);
              setTimeout(() => {
                setAsyncStorageDidChange(!asyncStorageDidChange);
              }, 1);
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
    <FlatList
      keyExtractor={(item) => `${item.book}-${item.chapter}`}
      data={readings}
      ItemSeparatorComponent={FlatListItemSeparator}
      renderItem={renderReading}
    />
  );
};

const styles = StyleSheet.create({});

export default Readings;
