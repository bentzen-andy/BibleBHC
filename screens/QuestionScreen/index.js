import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import QuestionForm from "./QuestionForm";
import CameraView from "./CameraView";

const QuestionScreen = ({ navigation }) => {
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <Stack.Navigator initialRouteName="QuestionForm">
      <Stack.Screen
        name="QuestionForm"
        component={QuestionForm}
        options={{ title: "Ask a Question" }}
      />
      <Stack.Screen
        name="CameraView"
        component={CameraView}
        options={{ title: "Camera View" }}
      />
    </Stack.Navigator>
  );
};

export default QuestionScreen;
