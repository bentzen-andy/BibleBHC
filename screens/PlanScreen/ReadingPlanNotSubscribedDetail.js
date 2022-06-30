import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { pushValueToStoredObjectArray } from "../../helpers/async-storage";

const ReadingPlanNotSubscribedDetail = ({ route, navigation }) => {
  const [planName, setPlanName] = useState("");
  const [planSummary, setPlanSummary] = useState("");
  const [planId, setPlanId] = useState("");

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
  }, [route.params]);

  return (
    <>
      <Text>Plan: {planName}</Text>
      <Text>Summary: {planSummary}</Text>
      <TouchableOpacity
        onPress={() => {
          console.log("Subscribed to " + planId);
          pushValueToStoredObjectArray("subscribed-plans", planId);
          navigation.goBack();
        }}
      >
        <Text>Subscribe to plan</Text>
      </TouchableOpacity>
    </>
  );
};

export default ReadingPlanNotSubscribedDetail;
