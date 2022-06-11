import React from "react";
import { Text, View, Button, SafeAreaView, ScrollView, StyleSheet } from "react-native";

const LearnScreen = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ flex: 1 }}>
          <View style={styles.plan} key={1}>
            <View style={styles.planImage}>
              <Text>Sep 4</Text>
            </View>
            <View style={styles.planDescription}>
              <Button title="Encounters with Jesus - Part 1" onPress={() => null} />
            </View>
          </View>

          <View style={styles.plan} key={2}>
            <View style={styles.planImage}>
              <Text>Sep 11</Text>
            </View>
            <View style={styles.planDescription}>
              <Button title="Encounters with Jesus - Part 2" onPress={() => null} />
            </View>
          </View>

          <View style={styles.plan} key={3}>
            <View style={styles.planImage}>
              <Text>Sep 18</Text>
            </View>
            <View style={styles.planDescription}>
              <Button title="Encounters with Jesus - Part 3" onPress={() => null} />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  plan: {
    flexDirection: "row",
  },
  planImage: {
    flex: 1,
    backgroundColor: "#888",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  planDescription: {
    flex: 5,
    backgroundColor: "#bbb",
    height: 50,
    justifyContent: "center",
  },
});

export default LearnScreen;
