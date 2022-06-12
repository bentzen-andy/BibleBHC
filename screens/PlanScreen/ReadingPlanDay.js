import React from "react";
import { View, Text, Button } from "react-native";

const ReadingPlanDay = ({ navigation, route }) => {
  const { planName, readings } = route.params.readingPlan;

  return (
    <View>
      <Text>{planName}</Text>
      {readings.map((dailyReadings, i) => (
        <Button
          key={i}
          title={`Day: ${i + 1}`}
          onPress={() =>
            navigation.navigate("ReadingPlanReadings", {
              dailyReadings,
            })
          }
        />
      ))}
    </View>
  );
};

export default ReadingPlanDay;
