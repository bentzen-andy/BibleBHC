import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";

const BibleChapterHeaderLeft = ({
  assignedReadings,
  setIsVisible,
  setBibleVersionListIsVisible,
  book,
  chapter,
  bibleVersion,
  navigation,
}) => {
  return (
    <View>
      {assignedReadings && (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Entypo name="chevron-thin-left" size={24} color="black" />
        </TouchableOpacity>
      )}

      {!assignedReadings && (
        <View style={styles.headerLeft}>
          <View>
            <TouchableOpacity
              style={styles.bibleChapterButton}
              onPress={() => setIsVisible(true)}
            >
              <Text style={styles.headerLeftText}>
                {book} {chapter}
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={styles.bibleVersionButton}
              onPress={() => setBibleVersionListIsVisible(true)}
            >
              <Text style={styles.headerLeftText}>{bibleVersion}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerLeft: {
    flex: 1,
    flexDirection: "row",
    marginLeft: 5,
    marginTop: 5,
  },

  bibleChapterButton: {
    textAlign: "center",
    borderWidth: 0,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginLeft: 1,
    borderBottomLeftRadius: 24,
    borderTopLeftRadius: 24,
    backgroundColor: "#ddd",
  },

  headerLeftText: { fontWeight: "bold" },

  bibleVersionButton: {
    textAlign: "center",
    borderWidth: 0,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginLeft: 1,
    borderBottomRightRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: "#ddd",
  },
});
export default BibleChapterHeaderLeft;
