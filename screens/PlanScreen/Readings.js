import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { CheckBox, ListItem } from "react-native-elements";
import {
  getMultipleStoredValues,
  toggleStoredValue,
} from "../../helpers/async-storage";

import FlatListItemSeparator from "./FlatListItemSeparator";

const Readings = ({ navigation, readings, planId }) => {
  const [checked, setChecked] = useState([]);
  const [checkboxIsPressed, setCheckboxIsPressed] = useState(false);

  // Every reading in the reading plans is uniquely identified in
  // the phone's local storage. This function checks to see if the
  // readings on this list have been previously read by the user.
  // If so, they will render with a check mark, else, no check mark.
  useEffect(() => {
    let readingIds = readings.map(
      (reading) => `${planId}${reading.book}${reading.chapter}`
    );
    getMultipleStoredValues(readingIds, (valueArray) => setChecked(valueArray));
  }, [checkboxIsPressed, readings]);

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
              toggleStoredValue(
                `${planId}${item.book}${item.chapter}`,
                `${planId}${item.book}${item.chapter}`,
                () => {
                  setCheckboxIsPressed(!checkboxIsPressed);
                }
              );
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
