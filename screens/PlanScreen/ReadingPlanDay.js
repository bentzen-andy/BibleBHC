import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const ReadingPlanDay = ({ navigation, route }) => {
  const { planName, readings } = route.params;

  return (
    <View style={styles.screen}>
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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 4,
    paddingTop: 10,
    backgroundColor: "#E8EAF6",
  },
});

export default ReadingPlanDay;
