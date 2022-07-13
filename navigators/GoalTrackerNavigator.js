import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import GoalNavigator from "./GoalNavigator";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const Drawer = createDrawerNavigator();

const showHeaderAndroid = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route);
  if (routeName == "GoalEditor" || routeName == "GoalSetter") {
    return false;
  }
  return true;
};

const inModules = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route);
  if (
    routeName == "Modules" ||
    routeName == "ModuleSetter" ||
    routeName == "ModuleEditor" ||
    routeName == "CompletedModules"
  ) {
    return true;
  }
  return false;
};

const inExercise = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route);
  return (
    routeName == "Exercise" ||
    routeName == "ExerciseSetter" ||
    routeName == "ExerciseEditor" || 
    routeName == "CompletedExercises"
  );
};

const inSavings = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route);
  return (
    routeName == "Savings" ||
    routeName == "SavingsSetter" ||
    routeName == "SavingsEditor" || 
    routeName == "CompletedSavings"
  );
};

export default GoalTrackerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={({ route }) => ({
        headerShown: Platform.OS === "ios" ? true : showHeaderAndroid(route),
        headerTintColor: "black",
        presentation: "modal",
        headerTitleAlign: "center",
        headerShadowVisible: false,
        drawerActiveTintColor: "black",
        drawerInactiveTintColor: "black",
        drawerStyle: { backgroundColor: "ghostwhite" },
        unmountOnBlur: true,
      })}
      useLegacyImplementation={true}
    >
      <Drawer.Screen
        name="Goal Tracker"
        options={{
          headerStyle: { backgroundColor: "mediumseagreen" },
          drawerActiveBackgroundColor: "mediumseagreen",
          headerTitle: "All Goals",
          drawerLabel: "All",
        }}
      >
        {({ route, navigation }) =>
          GoalNavigator({ route: route, navigation: navigation })
        }
      </Drawer.Screen>
      <Drawer.Screen
        name="Academic Tracker"
        options={({ route }) => ({
          headerTitle: !inModules(route) ? "Academic Goals" : "Modules",
          headerStyle: {
            backgroundColor: !inModules(route) ? "royalblue" : "#27A4F2",
          },
          drawerActiveBackgroundColor: !inModules(route)
            ? "royalblue"
            : "#27A4F2",
          // drawerActiveBackgroundColor: "royalblue",
          drawerLabel: "Academic",
        })}
      >
        {({ route, navigation }) =>
          GoalNavigator({ route: route, navigation: navigation })
        }
      </Drawer.Screen>
      <Drawer.Screen
        name="Fitness Tracker"
        options={({ route }) => ({
          headerStyle: {
            backgroundColor: !inExercise(route) ? "tomato" : "plum",
          },
          drawerActiveBackgroundColor: !inExercise(route) ? "tomato" : "plum",
          // drawerActiveBackgroundColor: "tomato",
          headerTitle: !inExercise(route) ? "Fitness Goals" : "Exercises",
          drawerLabel: "Fitness",
        })}
      >
        {({ route, navigation }) =>
          GoalNavigator({ route: route, navigation: navigation })
        }
      </Drawer.Screen>
      <Drawer.Screen
        name="Finance Tracker"
        options={({ route }) => ({
          headerStyle: {
            backgroundColor: !inSavings(route)
              ? "goldenrod"
              : "rgb(255,176,58)",
          },
          drawerActiveBackgroundColor: !inSavings(route)
            ? "goldenrod"
            : "rgb(255,176,58)",
          // drawerActiveBackgroundColor: "goldenrod",
          headerTitle: !inSavings(route) ? "Finance Goals" : "Savings",
          drawerLabel: "Finance",
        })}
      >
        {({ route, navigation }) =>
          GoalNavigator({ route: route, navigation: navigation })
        }
      </Drawer.Screen>
      <Drawer.Screen
        name="Completed Goals"
        options={({ route }) => ({
          headerStyle: {
            backgroundColor: inModules(route)
              ? "#27A4F2"
              : inExercise(route)
              ? "plum"
              : inSavings(route)
              ? "rgb(255,176,58)"
              : "mediumaquamarine",
          },
          drawerActiveBackgroundColor: inModules(route)
            ? "#27A4F2"
            : inExercise(route)
            ? "plum"
            : inSavings(route)
            ? "rgb(255,176,58)"
            : "mediumaquamarine",
          // drawerActiveBackgroundColor: "mediumaquamarine",
          headerTitle: inModules(route)
            ? "Completed Modules"
            : inExercise(route)
            ? "Completed Exercises"
            : inSavings(route)
            ? "Completed Savings"
            : "Completed Goals",
          // headerStyle: { backgroundColor: "mediumaquamarine" },
          // drawerActiveBackgroundColor: "mediumaquamarine",
          // headerTitle: "Completed Goals",
          drawerLabel: "Completed",
        })}
      >
        {({ route, navigation }) =>
          GoalNavigator({ route: route, navigation: navigation })
        }
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};
