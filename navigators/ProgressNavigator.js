import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProgressChecker from "../screens/progress-checker/ProgressChecker";
import GoalsProgress from "../screens/progress-checker/GoalsProgress";
import ModulesProgress from "../screens/progress-checker/ModulesProgress";
import ExercisesProgress from "../screens/progress-checker/ExercisesProgress";
import SavingsProgress from "../screens/progress-checker/SavingsProgress";
import { Image } from "react-native-elements";
import { StyleSheet, View, Text, Dimensions } from "react-native";

const Stack = createNativeStackNavigator();

export default ProgressNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProgressChecker"
        options={{
          headerTitle: "Progress",
          headerStyle: { backgroundColor: "slateblue" },
          headerTintColor: "black",
          headerShadowVisible: true,
          presentation: "card",
          headerTitleAlign: "center",
        }}
      >
        {() => <ProgressChecker navigation={navigation} />}
      </Stack.Screen>
      <Stack.Screen
        name="GoalsProgress"
        options={{
          headerShown: true,
          // headerTitle: "GOALS",
          headerTitle: (props) => (
            <Text
              style={{
                fontSize: 20,
                fontWeight: "500",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                style={{ width: 30, height: 28 }}
                source={require("../assets/goals-progress.png")}
                resizeMode="contain"
              />{" "}
              Goals
            </Text>
          ),
          headerStyle: { backgroundColor: "mediumseagreen" },
          headerTintColor: "black",
          headerShadowVisible: true,
          presentation: "card",
          headerTitleAlign: "center",
        }}
      >
        {() => <GoalsProgress navigation={navigation} />}
      </Stack.Screen>
      <Stack.Screen
        name="ModulesProgress"
        options={{
          headerShown: true,
          // headerTitle: "MODULES",
          headerTitle: (props) => (
            <Text
              style={{
                fontSize: 20,
                fontWeight: "500",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                style={{ width: 30, height: 28 }}
                source={require("../assets/modules-progress.png")}
                resizeMode="contain"
              />{" "}
              Modules
            </Text>
          ),
          headerStyle: { backgroundColor: "#27A4F2" },
          headerTintColor: "black",
          headerShadowVisible: true,
          presentation: "card",
          headerTitleAlign: "center",
        }}
      >
        {() => <ModulesProgress navigation={navigation} />}
      </Stack.Screen>
      <Stack.Screen
        name="ExercisesProgress"
        options={{
          headerShown: true,
          // headerTitle: "EXERCISES",
          headerTitle: (props) => (
            <Text
              style={{
                fontSize: 20,
                fontWeight: "500",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                style={{ width: 30, height: 28 }}
                source={require("../assets/exercises-progress.png")}
                resizeMode="contain"
              />{" "}
              Exercises
            </Text>
          ),
          headerStyle: { backgroundColor: "plum" },
          headerTintColor: "black",
          headerShadowVisible: true,
          presentation: "card",
          headerTitleAlign: "center",
        }}
      >
        {() => <ExercisesProgress navigation={navigation} />}
      </Stack.Screen>
      <Stack.Screen
        name="SavingsProgress"
        options={{
          headerShown: true,
          // headerTitle: "SAVINGS",
          headerTitle: (props) => (
            <Text
              style={{
                fontSize: 20,
                fontWeight: "500",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                style={{ width: 30, height: 28 }}
                source={require("../assets/savings-progress.png")}
                resizeMode="contain"
              />{" "}
              Savings
            </Text>
          ),
          headerStyle: { backgroundColor: "rgb(255,176,58)" },
          headerTintColor: "black",
          headerShadowVisible: true,
          presentation: "card",
          headerTitleAlign: "center",
        }}
      >
        {() => <SavingsProgress navigation={navigation} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
