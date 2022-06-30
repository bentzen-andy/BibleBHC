import React from "react";
import { Text } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import ReadingPlansSubscribed from "./ReadingPlansSubscribed";
import ReadingPlansNotSubscribed from "./ReadingPlansNotSubscribed";

const Tab = createMaterialTopTabNavigator();

const ReadingPlansAll = ({ route, navigation }) => {
  return (
    <Tab.Navigator initialRouteName="ReadingPlansSubscribed">
      <Tab.Screen name="My Plans" component={ReadingPlansSubscribed} />
      <Tab.Screen name="Find Plans" component={ReadingPlansNotSubscribed} />
    </Tab.Navigator>
  );
};

export default ReadingPlansAll;
