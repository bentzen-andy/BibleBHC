import React, { useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import PrayerForm from "./PrayerForm";
import QuestionForm from "./QuestionForm";
import BerkleyLogoHeaderRight from "../ReadScreen/BerkleyLogoHeaderRight";

const Tab = createMaterialTopTabNavigator();

const MessageScreen = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <BerkleyLogoHeaderRight />,
      // headerShown: false,
    });
  }, []);

  return (
    <Tab.Navigator initialRouteName="PrayerForm">
      <Tab.Screen
        name="PrayerForm"
        component={PrayerForm}
        options={{ title: "Prayer Request" }}
      />
      <Tab.Screen
        name="QuestionForm"
        component={QuestionForm}
        options={{ title: "Ask a Question" }}
      />
    </Tab.Navigator>
  );
};

export default MessageScreen;
