import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

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

  // Routes for the Bible-reading plan screens
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
        name="ReadScreen"
        component={ReadScreen}
        options={{ title: "Bible" }}
      />
    </Stack.Navigator>
  );
};

export default PlanScreen;
