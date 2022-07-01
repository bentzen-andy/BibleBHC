import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, FlatList, Image } from "react-native";
import { ListItem } from "react-native-elements";
import { setupReadingPlanListener } from "../../helpers/fb-reading-plans";

import FlatListItemSeparator from "./FlatListItemSeparator";

// This component is a list of reading plans that the user is subscribed to
const ReadingPlans = ({ navigation, getFilteredPlans, planDetail }) => {
  //   console.log("rendering");
  const [plans, setPlans] = useState([]);
  const [filteredPlans, setFilteredPlans] = useState([]);
  const [componentShouldRerender, setComponentShouldRerender] = useState(false);

  // Pulls all the reading plans down from the server.
  useEffect(() => {
    setupReadingPlanListener((items) => {
      setPlans(items);
    });
  }, [componentShouldRerender]);

  useEffect(() => {
    getFilteredPlans(plans).then((result) => setFilteredPlans(result));
  }, [plans]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setComponentShouldRerender(!componentShouldRerender);
    });
    return unsubscribe;
  });

  const renderPlan = ({ index, item }) => {
    const ICONS = {
      book: require("../../assets/book.jpg"),
      cross: require("../../assets/cross.jpg"),
      stress: require("../../assets/stress.jpg"),
    };
    return (
      <TouchableOpacity onPress={() => navigation.navigate(planDetail, item)}>
        <ListItem key={index}>
          <Image source={ICONS[item.planImage]} style={styles.icon} />
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
      data={filteredPlans}
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
    backgroundColor: "#eee",
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
  icon: { width: 100, height: 55 },
});

export default ReadingPlans;
