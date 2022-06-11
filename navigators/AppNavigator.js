import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import styles from "./AppNavigator.style";
import GoalTrackerNavigator from "./GoalTrackerNavigator";
import ProfileNavigator from "./ProfileNavigator";

import GameScreen from "../screens/game/GameScreen";

const Tab = createBottomTabNavigator();

const TempProgressChecker = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "ghostwhite",
      }}
    >
      <Text style={{ color: "black" }}>Progress Checker!</Text>
    </View>
  );
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
        <Tab.Screen name="Goals" options={{ headerShown: false }}>
          {({ route, navigation }) =>
            GoalTrackerNavigator({ route: route, navigation: navigation })
          }
        </Tab.Screen>
        <Tab.Screen name="Progress" component={TempProgressChecker} />
        <Tab.Screen
          name="Game"
          options={{
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
        >
          {({ navigation }) =>
            GameScreen({ navigation: navigation, session: session })
          }
        </Tab.Screen>
        <Tab.Screen name="Profile">
          {({ navigation }) =>
            ProfileNavigator({ session: session, navigation: navigation })
          }
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};
