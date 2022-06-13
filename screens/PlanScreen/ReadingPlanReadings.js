import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { CheckBox, ListItem } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ReadingPlanReadings = ({ navigation, route }) => {
  const readings = route.params.item;
  const planId = route.params.id;

  const [checked, setChecked] = useState([]);

  useEffect(() => {
    let readingIds = readings.map(
      (reading) => `${planId}${reading.book}${reading.chapter}`
    );
    getCompletedReadings(readingIds);
  }, []);

  const getCompletedReadings = async (readingIds) => {
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
  };

  const toggleCompletedReading = async (value) => {
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
  };

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
    backgroundColor: "#E8EAF6",
  },
});

export default ReadingPlanReadings;
