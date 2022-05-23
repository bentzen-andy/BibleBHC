import React from "react";
import ReadingPlanList from "./ReadingPlanList";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ReadingPlan from "./ReadingPlan";
import BibleChapter from "../ReadScreen/BibleChapter";

const Stack = createNativeStackNavigator();

const PlanScreen = () => {
  return (
    <Stack.Navigator
      initialRouteName="ReadingPlanList"
      screenOptions={{ headerShown: false }}
    >
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
      <Stack.Screen
        name="BibleChapter"
        component={BibleChapter}
        options={{ title: "Bible" }}
      />
    </Stack.Navigator>
  );
};

export default PlanScreen;
