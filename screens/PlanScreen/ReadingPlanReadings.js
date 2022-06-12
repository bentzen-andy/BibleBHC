import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const ReadingPlanReadings = ({ navigation, route }) => {
  const { dailyReadings } = route.params;

  return (
    <View style={styles.screen}>
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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 4,
    paddingTop: 10,
    backgroundColor: "#E8EAF6",
  },
});

export default ReadingPlanReadings;
