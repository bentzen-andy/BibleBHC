import React from "react";
import { Text, View, StyleSheet } from "react-native";
import mockData from "../../data/mockData";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ReadingPlan from "./ReadingPlan";

let data = Array.from(mockData);
const Stack = createNativeStackNavigator();

const PlanScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      {data.map((readingPlan) => (
        <View style={styles.plan} key={readingPlan.planName}>
          <View style={styles.planImage}>
            <Text>[IMG]</Text>
          </View>
          <View style={styles.planDescription}>
            <Text>{readingPlan.planName}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  plan: {
    flexDirection: "row",
  },
  planImage: {
    flex: 1,
    backgroundColor: "#888",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  planDescription: {
    flex: 5,
    backgroundColor: "#bbb",
    height: 50,
    justifyContent: "center",
  },
});
export default PlanScreen;
