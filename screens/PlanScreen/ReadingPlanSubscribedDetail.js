import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { BottomSheet, ListItem } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import {
  getStoredValue,
  removeStoredValue,
  removeValueFromStoredObjectArray,
} from "../../helpers/async-storage";
import { getImage } from "../../helpers/fb-images";
import { Feather } from "@expo/vector-icons";
import { setStoredValue } from "../../helpers/async-storage";

import Readings from "./Readings";

// This component is a list of Day items that the user can tap on.
// Each Day item brings you do the assigned readings for that day.
const ReadingPlanSubscribedDetail = ({ navigation, route }) => {
  const { readings, id, planImage, planName } = route.params;
  const [currentReadingList, setCurrentReadingList] = useState(readings[0]);
  const [imageURL, setImageURL] = useState(null);
  const [planStartDate, setPlanStartDate] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: planName,
      headerRight: () => (
        <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
          <Feather name="menu" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, []);

  useEffect(() => {
    getImage("ReadingPlanAssets", planImage, (path) => {
      setImageURL(path);
    });
  }, []);

  useEffect(() => {
    getStoredValue(`plan-start-date-${id}`, (timeStamp) => {
      setPlanStartDate(new Date(+timeStamp));
    });
  }, [isVisible]);

  function getFormattedDateMonthPlusDays(numDays) {
    let date = new Date(planStartDate);
    return new Date(date.setDate(date.getDate() + numDays))
      .toDateString()
      .split(" ")[1];
  }

  function getFormattedDateDayPlusDays(numDays) {
    let date = new Date(planStartDate);
    return Number.parseInt(
      new Date(date.setDate(date.getDate() + numDays))
        .toDateString()
        .split(" ")[2]
    );
  }

  function uncheckAllReadings(id, readingsArray) {
    readingsArray.map((readings) => {
      readings.map((reading) => {
        removeStoredValue(`${id}${reading.book}${reading.chapter}`);
      });
    });
  }

  const menu = (
    <BottomSheet
      isVisible={isVisible}
      style={{ marginTop: 50, backgroundColor: "#fff", height: 10000 }}
    >
      <ListItem
        key={0}
        onPress={() => setIsVisible(false)}
        containerStyle={{
          backgroundColor: "#eee",
          borderBottomWidth: 1,
        }}
      >
        <ListItem.Content>
          <ListItem.Title>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <AntDesign name="close" size={24} color="black" />
            </View>
          </ListItem.Title>
        </ListItem.Content>
      </ListItem>

      <ListItem
        key={1}
        style={{ borderBottomWidth: 1, borderBottomColor: "#ddd" }}
        onPress={() => {
          removeValueFromStoredObjectArray("subscribed-plans", id);
          navigation.goBack();
        }}
      >
        <ListItem.Content>
          <ListItem.Title>
            <Text>Stop This Plan</Text>
          </ListItem.Title>
        </ListItem.Content>
      </ListItem>

      <ListItem
        key={2}
        style={{ borderBottomWidth: 1, borderBottomColor: "#ddd" }}
        onPress={() => {
          setStoredValue(`plan-start-date-${id}`, `${Date.now()}`);
          uncheckAllReadings(id, readings);
          setIsVisible(false);
          navigation.goBack();
        }}
      >
        <ListItem.Content>
          <ListItem.Title>
            <Text>Restart Plan</Text>
          </ListItem.Title>
        </ListItem.Content>
      </ListItem>
    </BottomSheet>
  );

  const renderDay = ({ index, item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setCurrentReadingList(readings[index]);
        }}
        style={styles.dayButton}
      >
        <Text>{index + 1}</Text>
        <Text style={{ color: "#444", marginTop: 8, fontSize: 12 }}>
          {planStartDate
            ? `${getFormattedDateMonthPlusDays(
                index
              )} ${getFormattedDateDayPlusDays(index)}`
            : ""}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ height: "100%" }}>
      <Image
        source={
          imageURL
            ? { uri: imageURL }
            : require("../../assets/placeholder-image.png")
        }
        style={styles.heroImg}
      />

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
      {menu}
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

export default ReadingPlanSubscribedDetail;
