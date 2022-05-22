import React from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import mockData from "../../data/mockData";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

let data = Array.from(mockData);

const ReadingPlanList = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      {data.map((readingPlan) => (
        <View style={styles.plan} key={readingPlan.planName}>
          <View style={styles.planImage}>
            <Text>[IMG]</Text>
          </View>
          <View style={styles.planDescription}>
            <Button
              title={readingPlan.planName}
              onPress={() =>
                navigation.navigate("ReadingPlan", {
                  readingPlan,
                })
              }
            />
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

export default ReadingPlanList;
