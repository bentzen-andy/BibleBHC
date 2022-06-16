import React from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { ListItem } from "react-native-elements";

const ReadingPlanDay = ({ navigation, route }) => {
  const { readings, id } = route.params;

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#000",
        }}
      />
    );
  };

  const renderDay = ({ index, item }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("ReadingPlanReadings", { item, id })}
      >
        <ListItem key={index}>
          <ListItem.Content>
            <ListItem.Title>Day: {index + 1}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.screen}>
      <FlatList
        style={styles.screen}
        keyExtractor={(item) => `${item[0].book}-${item[0].chapter}`}
        data={readings}
        ItemSeparatorComponent={FlatListItemSeparator}
        renderItem={renderDay}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 4,
    paddingTop: 10,
    backgroundColor: "#eee",
  },
});

export default ReadingPlanDay;
