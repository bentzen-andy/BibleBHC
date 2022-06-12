import React from "react";
import { View, Text, Button } from "react-native";

const ReadingPlanReadings = ({ navigation, route }) => {
  const { dailyReadings } = route.params;

  return (
    <View>
      {dailyReadings.map((reading) => (
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

export default ReadingPlanReadings;
