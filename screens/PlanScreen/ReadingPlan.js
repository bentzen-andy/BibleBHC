import React from "react";
import { View, Text, Button } from "react-native";

const ReadingPlan = ({ navigation, route }) => {
  const { planName, readings } = route.params.readingPlan;

  return (
    <View>
      <Text>{planName}</Text>
      {readings.map((reading) => (
        <Button
          key={`${reading.book}${reading.chapter}`}
          title={`[ ] ${reading.book} ${reading.chapter}`}
          onPress={() =>
            navigation.navigate("BibleChapter", {
              book: reading.book,
              chapter: reading.chapter,
            })
          }
        />
      ))}
    </View>
  );
};

export default ReadingPlan;
