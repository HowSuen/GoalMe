import React from "react";
import Account from "./Account";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Icon } from "react-native-elements";
import styles from "./HomePage.style";

const Tab = createBottomTabNavigator();
// const Tab = createMaterialBottomTabNavigator();

function TempSettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
    </View>
  );
}

function TempGoalTrackers() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Goal Trackers!</Text>
    </View>
  );
}

function TempProgressChecker() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Progress Checker!</Text>
    </View>
  );
}

const HomePage = () => {
  return (
    <NavigationContainer styles={styles.container}>
      <Tab.Navigator
        screenOptions={({ route, navigation }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Account") {
              iconName = "account-circle";
            } else if (route.name === "Settings") {
              iconName = "settings";
            } else if (route.name === "Goal Trackers") {
              iconName = "flag";
            } else if (route.name === "Progress Checker") {
              iconName = "analytics";
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarStyle: { backgroundColor: "#222222"},
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
          headerStyle: { backgroundColor: "#222222" },
          headerTintColor: "white",
          presentation: "modal",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontWeight: "bold"
          }
        })}
      >
        <Tab.Screen name="Goal Trackers" component={TempGoalTrackers} />
        <Tab.Screen name="Progress Checker" component={TempProgressChecker} />
        <Tab.Screen name="Account" component={Account} />
        <Tab.Screen name="Settings" component={TempSettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default HomePage;