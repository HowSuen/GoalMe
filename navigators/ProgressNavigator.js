import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProgressChecker from "../screens/progress-checker/ProgressChecker";
import GoalsProgress from "../screens/progress-checker/GoalsProgress";
import ModulesProgress from "../screens/progress-checker/ModulesProgress";
import ExercisesProgress from "../screens/progress-checker/ExercisesProgress";
import SavingsProgress from "../screens/progress-checker/SavingsProgress";

const Stack = createNativeStackNavigator();

export default ProgressNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProgressChecker">
        {() => <ProgressChecker navigation={navigation} />}
      </Stack.Screen>
      <Stack.Screen
        name="GoalsProgress"
        options={{
          headerShown: true,
          headerTitle: "",
          headerStyle: { backgroundColor: "ghostwhite" },
          headerTintColor: "black",
          headerShadowVisible: false,
          presentation: "card",
          headerTitleAlign: "center",
        }}
      >
        {() => <GoalsProgress navigation={navigation} />}
      </Stack.Screen>
      <Stack.Screen
        name="ModulesProgress"
        options={{
          headerShown: true,
          headerTitle: "",
          headerStyle: { backgroundColor: "ghostwhite" },
          headerTintColor: "black",
          headerShadowVisible: false,
          presentation: "card",
          headerTitleAlign: "center",
        }}
      >
        {() => <ModulesProgress navigation={navigation} />}
      </Stack.Screen>
      <Stack.Screen
        name="ExercisesProgress"
        options={{
          headerShown: true,
          headerTitle: "",
          headerStyle: { backgroundColor: "ghostwhite" },
          headerTintColor: "black",
          headerShadowVisible: false,
          presentation: "card",
          headerTitleAlign: "center",
        }}
      >
        {() => <ExercisesProgress navigation={navigation} />}
      </Stack.Screen>
      <Stack.Screen
        name="SavingsProgress"
        options={{
          headerShown: true,
          headerTitle: "",
          headerStyle: { backgroundColor: "ghostwhite" },
          headerTintColor: "black",
          headerShadowVisible: false,
          presentation: "card",
          headerTitleAlign: "center",
        }}
      >
        {() => <SavingsProgress navigation={navigation} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
