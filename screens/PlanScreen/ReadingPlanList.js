import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  TouchableHighlight,
  FlatList,
  Image,
} from "react-native";
import { ListItem } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setupReadingPlanListener } from "../../helpers/fb-reading-plans";

// let data = Array.from(mockData);

const ReadingPlanList = ({ navigation }) => {
  const [plans, setPlans] = useState([]);
  const [noStoredCheckMarks, setNoStoredCheckMarks] = useState(false);

  useEffect(() => {
    setupReadingPlanListener((items) => {
      setPlans(items);
    });
  }, []);

  useEffect(() => {
    // check in local storage if three is any record of the user completing any readings
    // getCompletedReadings();
    let completedReadings = plans.map((plan) => {
      return { id: plan.id, completedReadings: [] };
    });
    storeCompletedReadings(completedReadings);
  }, [plans]);

  // useEffect(() => {
  //   // if there is no history of completed readings, set local storage to note that every
  //   // reading in every plan is unread.
  //   // console.log("---time to set the plans as unread");
  //   // console.log(plans);
  //   let completedReadings = plans.map((plan) => {
  //     return { id: plan.id, completedReadings: [] };
  //   });

  //   // console.log("----completedReadings - before");
  //   // console.log(completedReadings);

  //   // testing: manually enter one of the readings as checked TODO: remove this later
  //   // completedReadings.map((item) => {
  //   //   if (item.id === "-N4MyN-xuvGZ-86qfgVv") {
  //   //     item.completedReadings.push({ book: "Genesis", chapter: "2" });
  //   //   }
  //   // });

  //   console.log("----completedReadings - after");
  //   console.log(completedReadings);

  //   storeCompletedReadings(completedReadings);
  // }, [noStoredCheckMarks]);

  const getCompletedReadings = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@CompletedReadings");
      console.log("----jsonValue");
      console.log(jsonValue);

      const value = jsonValue != null ? JSON.parse(jsonValue) : null;
      console.log("----parsed json");
      console.log(value);
      if (value === null) {
        setNoStoredCheckMarks(true);
      }
    } catch (err) {
      console.log(err);
    }
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

  // console.log("----plans");
  // console.log(plans);

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

  const renderPlan = ({ index, item }) => {
    const ICONS = {
      book: require("../../assets/book.jpg"),
      cross: require("../../assets/cross.jpg"),
    };

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("ReadingPlanDay", item)}
      >
        <ListItem key={index}>
          <Image
            source={ICONS[item.planImage]}
            style={{ width: 100, height: 55 }}
          />
          <ListItem.Content>
            <ListItem.Title>{item.planName}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      style={styles.screen}
      keyExtractor={(item) => item.id}
      data={plans}
      ItemSeparatorComponent={FlatListItemSeparator}
      renderItem={renderPlan}
    />
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 4,
    paddingTop: 10,
    backgroundColor: "#E8EAF6",
  },
  pointStyle: {
    color: "#000",
    fontSize: 24,
  },
  dateStyle: {
    fontStyle: "italic",
    fontSize: 10,
    alignSelf: "flex-end",
  },
});

export default ReadingPlanList;
