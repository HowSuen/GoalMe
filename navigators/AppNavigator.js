import React from "react";
import Account from "../screens/Account";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Icon } from "react-native-elements";
import styles from "./AppNavigator.style";
import GTNavigator from "./GTNavigator";

const Tab = createBottomTabNavigator();

function TempSettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
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

const AppNavigator = ({ session }) => {
  return (
    <NavigationContainer styles={styles.container}>
      <Tab.Navigator
        initialRouteName={"Goal Trackers"}
        screenOptions={({ route, navigation }) => ({
          tabBarLabel: navigation.isFocused() ? route.name : "",
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
          tabBarStyle: { backgroundColor: "#222222" },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveBackgroundColor: "#111111",
          tabBarInactiveTintColor: "gray",
          tabBarHideOnKeyboard: true,
          headerStyle: { backgroundColor: "#222222" },
          headerTintColor: "white",
          presentation: "modal",
          headerTitleAlign: "center",
          headerTitleStyle: { fontWeight: "bold" },
        })}
      >
        <Tab.Screen name="Goal Trackers" component={GTNavigator} />
        <Tab.Screen name="Progress Checker" component={TempProgressChecker} />
        <Tab.Screen name="Account">
          {(props) => <Account session={session} />}
        </Tab.Screen>
        <Tab.Screen name="Settings" component={TempSettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
