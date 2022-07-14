import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import {
  pushValueToStoredObjectArray,
  setStoredValue,
} from "../../helpers/async-storage";
import { getImage } from "../../helpers/fb-images";

const ReadingPlanNotSubscribedDetail = ({ route, navigation }) => {
  const [planName, setPlanName] = useState("");
  const [planSummary, setPlanSummary] = useState("");
  const [planId, setPlanId] = useState("");
  const [planImageURL, setPlanImageURL] = useState("");

  useEffect(() => {
    if (route.params?.planName) {
      setPlanName(route.params.planName);
    }
    if (route.params?.planSummary) {
      setPlanSummary(route.params.planSummary);
    }
    if (route.params?.id) {
      setPlanId(route.params.id);
    }
    if (route.params?.planImage) {
      getImage("ReadingPlanAssets", route.params.planImage, (path) => {
        setPlanImageURL(path);
      });
    }
  }, [route.params]);

  return (
    <>
      <View style={styles.colorBackground} />
      <View style={styles.container}>
        <Image
          source={
            planImageURL
              ? { uri: planImageURL }
              : require("../../assets/placeholder-image.png")
          }
          style={styles.heroImg}
        />
        <View>
          <Text style={styles.planName}>{planName}</Text>
        </View>
        <View>
          <Text style={styles.planSummary}>{planSummary}</Text>
        </View>
        <View>
          <TouchableOpacity
            style={styles.subscribeButton}
            onPress={() => {
              pushValueToStoredObjectArray("subscribed-plans", planId);
              setStoredValue(`plan-start-date-${planId}`, `${Date.now()}`);
              navigation.goBack();
            }}
          >
            <Text style={styles.subscribeButtonText}>Subscribe to plan</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: { margin: 12 },
  colorBackground: {
    position: "absolute",
    // backgroundColor: "#457964",
    backgroundColor: "#3057d4",
    height: "30%",
    width: "100%",
  },
  heroImg: {
    marginTop: 12,
    height: "45%",
    borderRadius: 8,
  },
  planName: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 12,
  },
  planSummary: {
    fontSize: 16,
    marginTop: 12,
  },
  subscribeButton: {
    padding: 10,
    width: "100%",
    backgroundColor: "#bbb",
    borderRadius: 24,
    marginTop: 12,
  },
  subscribeButtonText: { textAlign: "center", fontSize: 18 },
});

export default ReadingPlanNotSubscribedDetail;
