import React from "react";
import { View, Text } from "react-native";

const ReadingPlan = ({ route }) => {
  const { planName, readings } = route.params.readingPlan;

  console.log(planName);
  console.log(readings);
  console.log(readings[0].book);
  console.log(readings[0].chapter);

  return (
    <View>
      <Text>{planName}</Text>
      {readings.map((reading) => (
        <Text>{`[ ] ${reading.book} ${reading.chapter}`}</Text>
      ))}
    </View>
  );
};

export default ReadingPlan;
