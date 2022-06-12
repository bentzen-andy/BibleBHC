import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";
import mockData from "../../data/mockData";
import {
  initReadingPlanDB,
  storeReadingPlanItem,
  setupReadingPlanListener,
} from "../../helpers/fb-reading-plans";

// let data = Array.from(mockData);

const ReadingPlanList = ({ navigation }) => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    try {
      initReadingPlanDB();
    } catch (err) {
      console.log(err);
    }
    setupReadingPlanListener((items) => {
      setPlans(items);
    });
  }, []);

  console.log("----plans");
  console.log(plans);

  return (
    <View style={{ flex: 1 }}>
      {plans.map((readingPlan) => (
        <View style={styles.plan} key={readingPlan.id}>
          <View style={styles.planImage}>
            <Text>[IMG]</Text>
          </View>
          <View style={styles.planDescription}>
            <Button
              title={readingPlan.planName}
              onPress={() =>
                navigation.navigate("ReadingPlanDay", {
                  readingPlan,
                })
              }
            />
          </View>
        </View>
      ))}

      {/* <TouchableOpacity
        onPress={() => {
          storeReadingPlanItem(plan);
          storeReadingPlanItem(plan2);
        }}
      >
        <Text>Add plan</Text>
      </TouchableOpacity> */}
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
