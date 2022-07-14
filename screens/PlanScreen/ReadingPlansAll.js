import React, { useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import ReadingPlansSubscribed from "./ReadingPlansSubscribed";
import ReadingPlansNotSubscribed from "./ReadingPlansNotSubscribed";

const Tab = createMaterialTopTabNavigator();

const ReadingPlansAll = ({ route, navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="ReadingPlansSubscribed"
      screenOptions={{
        tabBarIndicatorStyle: { borderBottomWidth: 3, borderColor: "#3057d4" },
      }}
    >
      <Tab.Screen name="My Plans" component={ReadingPlansSubscribed} />
      <Tab.Screen name="Find Plans" component={ReadingPlansNotSubscribed} />
    </Tab.Navigator>
  );
};

export default ReadingPlansAll;
