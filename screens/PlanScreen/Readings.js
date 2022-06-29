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
    getCompletedReadings(readingIds);
  }, [asyncStorageDidChange, readings]);

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
        // this is a real hacky solution, but it helps prevent the
        // component from re-rendering infinitely
        setTimeout(() => {
          setAsyncStorageDidChange(!asyncStorageDidChange);
        }, 1);
      } else {
        // this is a real hacky solution, but it helps prevent the
        // component from re-rendering infinitely
        await AsyncStorage.setItem(`@${value}`, value);
        setTimeout(() => {
          setAsyncStorageDidChange(!asyncStorageDidChange);
        }, 1);
      }
    } catch (err) {
      console.log(err);
    }
  }

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
    // <ScrollView>
    //   {readings.map((reading, i) => {
    //     <View key={`${reading.book}-${reading.chapter}`}>
    //       <renderReading index={i} item={reading} />
    //       <FlatListItemSeparator />
    //     </View>;
    //   })}
    // </ScrollView>
    //   );
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
