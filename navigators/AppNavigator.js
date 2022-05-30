import React from "react";
import Account from "../screens/Account";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Icon } from "react-native-elements";
import styles from "./AppNavigator.style";
import GTNavigator from "./GTNavigator";
import ProfileNavigator from "./ProfileNavigator";

const Tab = createBottomTabNavigator();

const TempSettingsScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
      }}
    >
      <Text style={{ color: "white" }}>Settings!</Text>
    </View>
  );
};

const TempProgressChecker = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
      }}
    >
      <Text style={{ color: "white" }}>Progress Checker!</Text>
    </View>
  );
};

const AppNavigator = ({ session }) => {
  return (
    <NavigationContainer styles={styles.container}>
      <Tab.Navigator
        initialRouteName={"Goal Trackers"}
        screenOptions={({ route, navigation }) => ({
          tabBarLabel: navigation.isFocused() ? route.name : "",
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Profile") {
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
          tabBarStyle: {
            backgroundColor: "black",
            borderTopColor: "black",
            borderTopWidth: 3,
            borderBottomWidth: 0,
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveBackgroundColor: "black",
          tabBarInactiveTintColor: "gray",
          tabBarHideOnKeyboard: true,
          headerShown: false,
        })}
      >
        <Tab.Screen
          name="Goal Trackers"
          component={GTNavigator}
          options={{ headerShown: false }}
        />
        <Tab.Screen name="Progress Checker" component={TempProgressChecker} />
        <Tab.Screen name="Profile">
          {({ navigation }) =>
            ProfileNavigator({ session: session, navigation: navigation })
          }
        </Tab.Screen>
        <Tab.Screen name="Settings" component={TempSettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
