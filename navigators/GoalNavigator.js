import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GoalTracker from "../screens/goal-trackers/GoalTracker";
import AcademicTracker from "../screens/goal-trackers/AcademicTracker";
import FitnessTracker from "../screens/goal-trackers/FitnessTracker";
import FinanceTracker from "../screens/goal-trackers/FinanceTracker";
import GoalEditor from "../screens/goal-trackers/GoalEditor";
import GoalSetter from "../screens/goal-trackers/GoalSetter";

const Stack = createNativeStackNavigator();

export default GoalNavigator = ({ route, navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, unmountOnBlur: true }}
    >
      {route.name == "Goal Tracker" ? (
        <Stack.Screen name="GoalTracker" component={GoalTracker} />
      ) : route.name == "Academic Tracker" ? (
        <Stack.Screen name="AcademicTracker" component={AcademicTracker} />
      ) : route.name == "Fitness Tracker" ? (
        <Stack.Screen name="FitnessTracker" component={FitnessTracker} />
      ) : (
        <Stack.Screen name="FinanceTracker" component={FinanceTracker} />
      )}
      <Stack.Screen
        name="GoalSetter"
        options={{
          headerShown: true,
          headerTitle: "Set a Goal",
          headerStyle: { backgroundColor: "ghostwhite" },
          headerTintColor: "black",
          presentation: "modal",
          headerTitleAlign: "center",
        }}
      >
        {() => <GoalSetter route={route} navigation={navigation} />}
      </Stack.Screen>
      <Stack.Screen
        name="GoalEditor"
        options={{
          headerShown: true,
          headerTitle: "Your Goal",
          headerStyle: { backgroundColor: "ghostwhite" },
          headerTintColor: "black",
          presentation: "modal",
          headerTitleAlign: "center",
        }}
      >
        {() => <GoalEditor route={route} navigation={navigation} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
