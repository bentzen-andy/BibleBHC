import React from "react";
import { Text, View, StyleSheet } from "react-native";
import ReadingPlanList from "./ReadingPlanList";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import mockData from "../../data/mockData";
import ReadingPlan from "./ReadingPlan";

let data = Array.from(mockData);

const Stack = createNativeStackNavigator();

const PlanScreen = () => {
  return (
    <Stack.Navigator initialRouteName="ReadingPlanList">
      <Stack.Screen
        name="ReadingPlanList"
        component={ReadingPlanList}
        options={{ title: "Reading Plan List" }}
      />
      <Stack.Screen
        name="ReadingPlan"
        component={ReadingPlan}
        options={{ title: "Reading Plan" }}
      />
    </Stack.Navigator>
  );
};

export default PlanScreen;
