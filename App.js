import React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

import ReadScreen from "./screens/ReadScreen";

function PlanScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Plan!</Text>
    </View>
  );
}

function LearnScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Learn!</Text>
    </View>
  );
}

function QuestionScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Question!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Read") {
              iconName = "bible";
            } else if (route.name === "Plan") {
              iconName = "calendar-check";
            } else if (route.name === "Learn") {
              iconName = "graduation-cap";
            } else if (route.name === "Question") {
              iconName = "question-circle";
            }

            // You can return any component that you like here!
            return <FontAwesome5 name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Read" component={ReadScreen} />
        <Tab.Screen name="Plan" component={PlanScreen} />
        <Tab.Screen name="Learn" component={LearnScreen} />
        <Tab.Screen name="Question" component={QuestionScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
