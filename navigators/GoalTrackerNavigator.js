import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import GoalNavigator from "./GoalNavigator";
import CompletedGoals from "../screens/goal-trackers/CompletedGoals";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const Drawer = createDrawerNavigator();

const showHeaderAndroid = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route);
  if (
    routeName == "GoalEditor" ||
    routeName == "GoalSetter"
  ) {
    return false;
  }
  return true;
};

const inModules = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route);
  if (
    routeName == "Modules" ||
    routeName == "ModuleSetter" ||
    routeName == "ModuleEditor"
  ) {
    return true;
  }
  return false;
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
    >
      <Drawer.Screen
        name="Goal Tracker"
        options={{
          headerStyle: { backgroundColor: "mediumseagreen" },
          drawerActiveBackgroundColor: "mediumseagreen",
          headerTitle: "All Goals",
          drawerLabel: "All Goals",
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
            backgroundColor: !inModules(route) ? "royalblue" : "deepskyblue",
          },
          drawerActiveBackgroundColor: "royalblue",
          drawerLabel: "Academic Goals",
        })}
      >
        {({ route, navigation }) =>
          GoalNavigator({ route: route, navigation: navigation })
        }
      </Drawer.Screen>
      <Drawer.Screen
        name="Fitness Tracker"
        options={{
          headerStyle: { backgroundColor: "tomato" },
          drawerActiveBackgroundColor: "tomato",
          headerTitle: "Fitness Goals",
          drawerLabel: "Fitness Goals",
        }}
      >
        {({ route, navigation }) =>
          GoalNavigator({ route: route, navigation: navigation })
        }
      </Drawer.Screen>
      <Drawer.Screen
        name="Finance Tracker"
        options={{
          headerStyle: { backgroundColor: "goldenrod" },
          drawerActiveBackgroundColor: "goldenrod",
          headerTitle: "Finance Goals",
          drawerLabel: "Finance Goals",
        }}
      >
        {({ route, navigation }) =>
          GoalNavigator({ route: route, navigation: navigation })
        }
      </Drawer.Screen>
      <Drawer.Screen
        name="Completed Goals"
        component={CompletedGoals}
        options={{
          headerStyle: { backgroundColor: "mediumaquamarine" },
          drawerActiveBackgroundColor: "mediumaquamarine",
        }}
      />
    </Drawer.Navigator>
  );
};
