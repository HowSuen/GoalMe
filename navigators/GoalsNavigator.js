import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import styles from "./GoalsNavigator.style";
import CompletedGoals from "../screens/goal-trackers/CompletedGoals";
import GoalNavigator from "./GoalNavigator";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const Drawer = createDrawerNavigator();

const showHeader = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route);

  if (routeName == "Goal") {
    return false;
  }
  return true;
};

export default GoalsNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={({route}) => ({
        headerShown: Platform.OS === "ios" ? true : showHeader(route),
        headerTintColor: "black",
        presentation: "modal",
        headerTitleAlign: "center",
        headerShadowVisible: false,
        drawerActiveTintColor: "black",
        drawerInactiveTintColor: "black",
        drawerStyle: styles.container,
      })}
    >
      <Drawer.Screen
        name="Goal Tracker"
        options={{
          headerStyle: { backgroundColor: "mediumseagreen" },
          drawerActiveBackgroundColor: "mediumseagreen",
          unmountOnBlur: true,
        }}
      >
        {({ route, navigation }) =>
          GoalNavigator({ route: route, navigation: navigation })
        }
      </Drawer.Screen>
      <Drawer.Screen
        name="Academic Tracker"
        options={{
          headerStyle: { backgroundColor: "royalblue" },
          drawerActiveBackgroundColor: "royalblue",
          unmountOnBlur: true,
        }}
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
          unmountOnBlur: true,
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
          unmountOnBlur: true,
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
          unmountOnBlur: true,
        }}
      />
    </Drawer.Navigator>
  );
};
