import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import styles from "./AppNavigator.style";
import GoalTrackerNavigator from "./GoalTrackerNavigator";
import ProfileNavigator from "./ProfileNavigator";
import GameNavigator from "./GameNavigator";
import ProgressNavigator from "./ProgressNavigator";

const Tab = createBottomTabNavigator();

const goalsColor = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route);
  if (routeName == "Goal Tracker") {
    return "mediumseagreen";
  } else if (routeName == "Academic Tracker") {
    return "royalblue";
  } else if (routeName == "Fitness Tracker") {
    return "tomato";
  } else if (routeName == "Finance Tracker") {
    return "goldenrod";
  } else if (routeName == "Completed Goals") {
    return "mediumaquamarine";
  } else {
    return "mediumseagreen";
  }
};

const profileColor = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route);
  if (routeName == "CustomiseAvatar") {
    return "rgb(69,190,219)";
  } else {
    return "dodgerblue";
  }
};

export default AppNavigator = ({ session }) => {
  return (
    <NavigationContainer styles={styles.container}>
      <Tab.Navigator
        initialRouteName={"Goals"}
        screenOptions={({ route, navigation }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Profile") {
              iconName = focused ? "account-circle" : "account-circle-outline";
            } else if (route.name === "Settings") {
              iconName = focused ? "cog" : "cog-outline";
            } else if (route.name === "Goals") {
              iconName = focused ? "flag-variant" : "flag-variant-outline";
            } else if (route.name === "Progress") {
              iconName = focused ? "chart-box" : "chart-box-outline";
            }
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
              />
            );
          },
          tabBarStyle: {
            backgroundColor: "ghostwhite",
            borderTopColor: "ghostwhite",
            borderTopWidth: 0,
            borderBottomWidth: 0,
          },
          tabBarActiveTintColor: "dodgerblue",
          tabBarInactiveBackgroundColor: "ghostwhite",
          tabBarInactiveTintColor: "gray",
          tabBarHideOnKeyboard: true,
          headerShown: false,
        })}
      >
        <Tab.Screen
          name="Goals"
          options={({ route, navigation }) => ({
            headerShown: false,
            tabBarActiveTintColor: goalsColor(route),
          })}
        >
          {({ route, navigation }) =>
            GoalTrackerNavigator({ route: route, navigation: navigation })
          }
        </Tab.Screen>
        <Tab.Screen
          name="Progress"
          options={({ route, navigation }) => ({
            tabBarActiveTintColor: "#A093BF",
          })}
        >
          {({ navigation }) => ProgressNavigator({ navigation: navigation })}
        </Tab.Screen>
        <Tab.Screen
          name="Game"
          options={{
            tabBarActiveTintColor: "#3A637A",
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <Ionicons
                  name={focused ? "game-controller" : "game-controller-outline"}
                  size={size}
                  color={color}
                />
              );
            },
          }}
          // listeners={({ navigation }) => ({
          //   blur: () => navigation.setParams({ screen: "GameScreen" }),
          // })}
        >
          {({ navigation }) =>
            GameNavigator({ navigation: navigation, session: session })
          }
        </Tab.Screen>
        <Tab.Screen
          name="Profile"
          options={({ route, navigation }) => ({
            tabBarActiveTintColor: profileColor(route),
          })}
        >
          {({ navigation }) =>
            ProfileNavigator({ session: session, navigation: navigation })
          }
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};
