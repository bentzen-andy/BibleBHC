import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { removeValueFromStoredObjectArray } from "../../helpers/async-storage";

import Readings from "./Readings";

// This component is a list of Day items that the user can tap on.
// Each Day item brings you do the assigned readings for that day.
const ReadingPlanDetail = ({ navigation, route }) => {
  const { readings, id, planImage, planName } = route.params;
  const [currentReadingList, setCurrentReadingList] = useState(readings[0]);
  const ICONS = {
    book: require("../../assets/book.jpg"),
    cross: require("../../assets/cross.jpg"),
    stress: require("../../assets/stress.jpg"),
  };

  useEffect(() => {
    navigation.setOptions({
      title: planName,
    });
  }, []);

  const renderDay = ({ index, item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setCurrentReadingList(readings[index]);
        }}
        style={styles.dayButton}
      >
        <Text>{index + 1}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ height: "100%" }}>
      <TouchableOpacity
        onPress={() => {
          removeValueFromStoredObjectArray("subscribed-plans", id);
          navigation.goBack();
        }}
      >
        <Text>unsubscribe</Text>
      </TouchableOpacity>
      <Image source={ICONS[planImage]} style={styles.heroImg} />
      <View style={{ height: 60 }}>
        <FlatList
          style={styles.dayList}
          data={readings}
          keyExtractor={(item) => `${item[0].book}-${item[0].chapter}`}
          renderItem={renderDay}
          horizontal
        />
      </View>
      <Readings
        readings={currentReadingList}
        planId={id}
        navigation={navigation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dayList: { borderWidth: 1, borderColor: "#999" },
  heroImg: {
    height: "40%",
    width: "100%",
  },
  dayButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: 60,
    backgroundColor: "#fff",
    borderColor: "#999",
    borderRightWidth: 1,
    borderBottomColor: "#000",
  },
});

export default ReadingPlanDetail;
