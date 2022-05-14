import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Read from "./Read";

const App = () => {
  return (
    <View style={styles.container}>
      <Read />
      <Text>|----BOTTOM NAVBAR-----|</Text>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
