import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ReadingPlansAll from "./ReadingPlansAll";
import ReadingPlansSubscribed from "./ReadingPlansSubscribed";
import ReadingPlansNotSubscribed from "./ReadingPlansNotSubscribed";
import ReadingPlanDetail from "./ReadingPlanDetail";
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
    <Stack.Navigator initialRouteName="ReadingPlansAll">
      <Stack.Screen
        name="ReadingPlansAll"
        component={ReadingPlansAll}
        options={{ title: "Plans" }}
      />
      <Stack.Screen
        name="ReadingPlansNotSubscribed"
        component={ReadingPlansNotSubscribed}
        options={{ title: "Find Plans" }}
      />
      <Stack.Screen
        name="ReadingPlansSubscribed"
        component={ReadingPlansSubscribed}
        options={{ title: "My Plans" }}
      />
      <Stack.Screen
        name="ReadingPlanDetail"
        component={ReadingPlanDetail}
        options={{ title: "Plan" }}
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
