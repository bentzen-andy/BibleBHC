import * as Analytics from "expo-firebase-analytics";
import React, { useEffect, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { initDB } from "./helpers/fb-init";

import ReadScreen from "./screens/ReadScreen";
import PlanScreen from "./screens/PlanScreen";
import QuestionScreen from "./screens/QuestionScreen";
import Test from "./screens/Test";

// Root of the application
// Handles routing for tabs. Each tab may have multiple screens.
export default function App() {
  // Do not remove these refs! They are used for Firebase analytics.
  const navigationRef = useRef();
  const routeNameRef = useRef();

  const Tab = createBottomTabNavigator();

  useEffect(() => {
    try {
      initDB();
    } catch (err) {
      console.log(err);
    }
  });

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() =>
        (routeNameRef.current = navigationRef.current.getCurrentRoute().name)
      }
      // Used for Firebase analytics.
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current.getCurrentRoute().name;
        if (previousRouteName !== currentRouteName) {
          await Analytics.logEvent("screen_view", {
            screen_name: currentRouteName,
            screen_class: currentRouteName,
          });
        }
        // Save the current route name for later comparison
        routeNameRef.current = currentRouteName;
      }}
    >
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Read") {
              iconName = "bible";
            } else if (route.name === "Plan") {
              iconName = "calendar-check";
            } else if (route.name === "Question") {
              iconName = "question-circle";
            }

            // You can return any component that you like here!
            return <FontAwesome5 name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#555",
          tabBarInactiveTintColor: "#999",
        })}
      >
        <Tab.Screen
          name="Read"
          component={ReadScreen}
          options={{ title: "Bible" }}
        />
        <Tab.Screen
          name="Plan"
          component={PlanScreen}
          options={{ title: "Plans" }}
        />
        <Tab.Screen
          name="Question"
          component={QuestionScreen}
          options={{ title: "Ask a Question" }}
        />
        <Tab.Screen name="Test" component={Test} options={{ title: "Test" }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
