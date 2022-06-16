import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ReadingPlanReadings from "./ReadingPlanReadings";
import ReadingPlanList from "./ReadingPlanList";
import ReadingPlanDay from "./ReadingPlanDay";
import ReadScreen from "../ReadScreen";

const PlanScreen = ({ navigation }) => {
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <Stack.Navigator initialRouteName="ReadingPlanList">
      <Stack.Screen
        name="ReadingPlanList"
        component={ReadingPlanList}
        options={{ title: "Reading Plan List" }}
      />
      <Stack.Screen
        name="ReadingPlanDay"
        component={ReadingPlanDay}
        options={{ title: "Reading Plan Day" }}
      />
      <Stack.Screen
        name="ReadingPlanReadings"
        component={ReadingPlanReadings}
        options={{ title: "Reading Plan Readings" }}
      />
      <Stack.Screen
        name="ReadScreen"
        component={ReadScreen}
        options={{ title: "Bible" }}
      />
    </Stack.Navigator>
  );
};

export default PlanScreen;
