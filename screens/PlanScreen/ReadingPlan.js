import React from "react";
import { View, Text } from "react-native";

const ReadingPlan = ({ readingPlan }) => {
  return (
    <View>
      <Text>{readingPlan}</Text>
      <Text>Reading Plan</Text>
    </View>
  );
};

export default ReadingPlan;
