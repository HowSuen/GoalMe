import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import styles from "./GoalNavigator.style";
import CompletedGoals from "../screens/goal-trackers/CompletedGoals";
import GoalDetailsNavigator from "./GoalDetailsNavigator";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const Drawer = createDrawerNavigator();

const showHeader = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route);
  // console.log(routeName);

  if (routeName == "GoalDetails") {
    return false;
  }
  return true;
};

export default GoalNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={({route}) => ({
        headerShown: showHeader(route),
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
          GoalDetailsNavigator({ route: route, navigation: navigation })
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
          GoalDetailsNavigator({ route: route, navigation: navigation })
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
          GoalDetailsNavigator({ route: route, navigation: navigation })
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
          GoalDetailsNavigator({ route: route, navigation: navigation })
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
