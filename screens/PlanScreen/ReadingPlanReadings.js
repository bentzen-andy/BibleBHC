import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
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
    console.log("----readingIds");
    console.log(readingIds);
    getCompletedReadings(readingIds);
  }, []);

  // const getData = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem("@isChecked");
  //     setChecked(value === "1");
  //     if (value !== null) {
  //       // setStoredCheckMark("0")
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const saveCheckedItem = (planId, book, chapter) => {
    console.log(planId);
    console.log(book);
    console.log(chapter);
    console.log(checked);
    let completedReadings = {
      id: planId,
      completedReadings: [{ book, chapter }],
    };

    storeCompletedReadings(completedReadings);
  };

  const storeCompletedReadings = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@CompletedReadings", jsonValue);
      console.log("----jsonValue");
      console.log(jsonValue);
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

  const getCompletedReadings = async (readingIds) => {
    try {
      let arr = [];
      for (const id of readingIds) {
        const value = await AsyncStorage.getItem(`@${id}`);
        arr.push(value);
      }
      console.log("----arr");
      console.log(arr);
      setChecked(arr);
    } catch (err) {
      console.log(err);
    }
  };

  const getCompletedReading = async () => {
    try {
      const value = await AsyncStorage.getItem("@CompletedReadings");
      if (value != null) {
        setChecked(value);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const isThisChapterRead = (planId, book, chapter) => {
    // console.log("----planId");
    // console.log(planId);
    // console.log("----book");
    // console.log(book);
    // console.log("----chapter");
    // console.log(chapter);
    // console.log("----checked");
    // console.log(checked);

    let result = false;

    checked.map((plan) => {
      if (plan?.id && plan.id === planId) {
        plan.completedReadings.map((record) => {
          if (record.book === book && record.chapter === chapter) {
            result = true;
          }
        });
      }
    });

    console.log("----result");
    console.log(result);

    return result;
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
    // console.log("item");
    // console.log(item.book);
    // console.log("----");

    const isChecked = isThisChapterRead(planId, item.book, item.chapter);
    console.log("----isChecked");
    console.log(isChecked);

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

      {/* {readings.map((reading) => (
        <Button
          key={`${reading.book}${reading.book}${reading.chapter}`}
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
