import React, { useEffect, useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { CheckBox, ListItem } from "react-native-elements";
import {
  getMultipleStoredValues,
  toggleStoredValue,
} from "../../helpers/async-storage";

import FlatListItemSeparator from "./FlatListItemSeparator";

const Readings = ({ navigation, readings, planId }) => {
  const [checked, setChecked] = useState([]);
  const [componentShouldRerender, setComponentShouldRerender] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setComponentShouldRerender(!componentShouldRerender);
    });
    return unsubscribe;
  });

  // Every reading in the reading plans is uniquely identified in
  // the phone's local storage. This function checks to see if the
  // readings on this list have been previously read by the user.
  // If so, they will render with a check mark, else, no check mark.
  useEffect(() => {
    let readingIds = readings.map(
      (reading) => `${planId}${reading.book}${reading.chapter}`
    );
    getMultipleStoredValues(readingIds, (valueArray) => setChecked(valueArray));
  }, [componentShouldRerender, readings]);

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
            checkedColor={"#629f82"}
            iconType="feather"
            checkedIcon="check"
            uncheckedIcon="square"
            onPress={() => {
              toggleStoredValue(
                `${planId}${item.book}${item.chapter}`,
                `${planId}${item.book}${item.chapter}`,
                () => {
                  setComponentShouldRerender(!componentShouldRerender);
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

export default Readings;
