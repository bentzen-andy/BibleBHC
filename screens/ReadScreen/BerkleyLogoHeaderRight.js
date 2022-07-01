import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const BerkleyLogoHeaderRight = ({ assignedReadings, book, chapter }) => {
  // The current reading plan will be stored in an array. This helper function
  // determines which index of the reading plan array we are currently on based
  // on which book/chapter is actively displayed.
  function getPlanReadingIndex() {
    let index;
    assignedReadings.map((item, i) => {
      if (item.book === book && item.chapter === chapter) {
        index = i;
      }
    });
    return index;
  }

  return (
    <View>
      {assignedReadings && (
        <View style={styles.headerRightPlanReading}>
          <Text style={styles.headerRightText}>
            Plan: {getPlanReadingIndex() + 1} of {assignedReadings.length}
          </Text>
          <Text style={styles.headerRightText}>
            {book} {chapter}
          </Text>
        </View>
      )}
      {!assignedReadings && (
        <Image
          source={require("../../assets/Berkley_HillsChurch_Logo_Black-400x361.png")}
          style={[
            styles.headerRightImage,
            !assignedReadings && { marginRight: 20 },
          ]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerRightPlanReading: {
    marginLeft: -20,
    borderColor: "#fff",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 24,
    backgroundColor: "#fff",
  },
  headerRightText: { textAlign: "right", fontWeight: "bold" },
  headerRightImage: { width: 46, height: 42 },
});
export default BerkleyLogoHeaderRight;
