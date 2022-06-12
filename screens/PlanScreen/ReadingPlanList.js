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
import mockData from "../../data/mockData";
import { setupReadingPlanListener } from "../../helpers/fb-reading-plans";

// let data = Array.from(mockData);

const ReadingPlanList = ({ navigation }) => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    setupReadingPlanListener((items) => {
      setPlans(items);
    });
  }, []);

  console.log("----plans");
  console.log(plans);

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
