import React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

import ReadScreen from "./screens/ReadScreen";
import PlanScreen from "./screens/PlanScreen";
import LearnScreen from "./screens/LearnScreen";

import BottomSheet from "react-native-simple-bottom-sheet";

// function LearnScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>Learn!</Text>
//     </View>
//   );
// }

function QuestionScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Question!</Text>
    </View>
  );
}

// function QuestionScreen() {
//   return (
//     <View style={{ flex: 1 }}>
//       <View>
//         <Text>Your content</Text>
//       </View>
//       <BottomSheet isOpen>
//         <Text>The component to render inside the panel</Text>
//         <View />
//       </BottomSheet>
//     </View>
//   );
// }

function LeaderScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Small Group Leaders Only!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          // headerShown: false,
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
            } else if (route.name === "Leader") {
              iconName = "user-friends";
              // iconName = "lock";
            }

            // You can return any component that you like here!
            return <FontAwesome5 name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#555",
          tabBarInactiveTintColor: "#999",
        })}
      >
        <Tab.Screen name="Read" component={ReadScreen} />
        <Tab.Screen name="Plan" component={PlanScreen} />
        <Tab.Screen name="Learn" component={LearnScreen} />
        <Tab.Screen name="Question" component={QuestionScreen} />
        {/* <Tab.Screen name="Leader" component={LeaderScreen} /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
