import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GoalTracker from "../screens/goal-trackers/GoalTracker";
import AcademicTracker from "../screens/goal-trackers/AcademicTracker";
import FitnessTracker from "../screens/goal-trackers/FitnessTracker";
import FinanceTracker from "../screens/goal-trackers/FinanceTracker";
import GoalEditor from "../screens/goal-trackers/GoalEditor";
import GoalSetter from "../screens/goal-trackers/GoalSetter";
import Modules from "../screens/goal-trackers/Modules";
import ModuleEditor from "../screens/goal-trackers/ModuleEditor";
import ModuleSetter from "../screens/goal-trackers/ModuleSetter";
import Exercise from "../screens/goal-trackers/Exercise";
import ExerciseEditor from "../screens/goal-trackers/ExerciseEditor";
import ExerciseSetter from "../screens/goal-trackers/ExerciseSetter";
import Savings from "../screens/goal-trackers/Savings";
import SavingsEditor from "../screens/goal-trackers/SavingsEditor";
import SavingsSetter from "../screens/goal-trackers/SavingsSetter";
import CompletedGoals from "../screens/goal-trackers/CompletedGoals";
import CompletedModules from "../screens/goal-trackers/CompletedModules";
import CompletedExercises from "../screens/goal-trackers/CompletedExercises";
import CompletedSavings from "../screens/goal-trackers/CompletedSavings";
import { Platform } from "react-native";

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
      ) : route.name == "Finance Tracker" ? (
        <Stack.Screen name="FinanceTracker" component={FinanceTracker} />
      ) : (
        <Stack.Screen name="CompletedGoals" component={CompletedGoals} />
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
          headerTitle: Platform.OS === "ios" ? "" : "Edit Goal",
          headerStyle: { backgroundColor: "ghostwhite" },
          headerTintColor: "black",
          headerShadowVisible: Platform.OS !== "ios",
          presentation: "card",
          headerTitleAlign: "center",
        }}
      >
        {() => <GoalEditor route={route} navigation={navigation} />}
      </Stack.Screen>
      <Stack.Screen
        name="Modules"
        component={Modules}
        options={{
          headerShown: Platform.OS === "ios" ? true : false,
          headerTitle: "",
          headerStyle: { backgroundColor: "ghostwhite" },
          headerTintColor: "black",
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="ModuleSetter"
        options={{
          headerShown: Platform.OS === "ios" ? true : false,
          headerTitle: "Add Your Modules",
          headerStyle: { backgroundColor: "ghostwhite" },
          headerTintColor: "black",
          presentation: "modal",
          headerTitleAlign: "center",
        }}
      >
        {() => <ModuleSetter route={route} navigation={navigation} />}
      </Stack.Screen>
      <Stack.Screen
        name="ModuleEditor"
        options={{
          headerShown: Platform.OS === "ios" ? true : false,
          headerTitle: "",
          headerStyle: { backgroundColor: "ghostwhite" },
          headerTintColor: "black",
          headerShadowVisible: false,
          presentation: "card",
          headerTitleAlign: "center",
        }}
      >
        {() => <ModuleEditor route={route} navigation={navigation} />}
      </Stack.Screen>
      <Stack.Screen
        name="Exercise"
        component={Exercise}
        options={{
          headerShown: Platform.OS === "ios" ? true : false,
          headerTitle: "",
          headerStyle: { backgroundColor: "ghostwhite" },
          headerTintColor: "black",
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="ExerciseSetter"
        options={{
          headerShown: Platform.OS === "ios" ? true : false,
          headerTitle: "Add an Exercise",
          headerStyle: { backgroundColor: "ghostwhite" },
          headerTintColor: "black",
          presentation: "modal",
          headerTitleAlign: "center",
        }}
      >
        {() => <ExerciseSetter route={route} navigation={navigation} />}
      </Stack.Screen>
      <Stack.Screen
        name="ExerciseEditor"
        options={{
          headerShown: Platform.OS === "ios" ? true : false,
          headerTitle: "",
          headerStyle: { backgroundColor: "ghostwhite" },
          headerTintColor: "black",
          headerShadowVisible: false,
          presentation: "card",
          headerTitleAlign: "center",
        }}
      >
        {() => <ExerciseEditor route={route} navigation={navigation} />}
      </Stack.Screen>
      <Stack.Screen
        name="Savings"
        component={Savings}
        options={{
          headerShown: Platform.OS === "ios" ? true : false,
          headerTitle: "",
          headerStyle: { backgroundColor: "ghostwhite" },
          headerTintColor: "black",
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="SavingsSetter"
        options={{
          headerShown: Platform.OS === "ios" ? true : false,
          headerTitle: "Add a Saving Goal",
          headerStyle: { backgroundColor: "ghostwhite" },
          headerTintColor: "black",
          presentation: "modal",
          headerTitleAlign: "center",
        }}
      >
        {() => <SavingsSetter route={route} navigation={navigation} />}
      </Stack.Screen>
      <Stack.Screen
        name="SavingsEditor"
        options={{
          headerShown: Platform.OS === "ios" ? true : false,
          headerTitle: "",
          headerStyle: { backgroundColor: "ghostwhite" },
          headerTintColor: "black",
          headerShadowVisible: false,
          presentation: "card",
          headerTitleAlign: "center",
        }}
      >
        {() => <SavingsEditor route={route} navigation={navigation} />}
      </Stack.Screen>
      <Stack.Screen
        name="CompletedModules"
        component={CompletedModules}
        options={{
          headerShown: Platform.OS === "ios" ? true : false,
          headerTitle: "",
          headerStyle: { backgroundColor: "ghostwhite" },
          headerTintColor: "black",
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="CompletedExercises"
        component={CompletedExercises}
        options={{
          headerShown: Platform.OS === "ios" ? true : false,
          headerTitle: "",
          headerStyle: { backgroundColor: "ghostwhite" },
          headerTintColor: "black",
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="CompletedSavings"
        component={CompletedSavings}
        options={{
          headerShown: Platform.OS === "ios" ? true : false,
          headerTitle: "",
          headerStyle: { backgroundColor: "ghostwhite" },
          headerTintColor: "black",
          headerShadowVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};
