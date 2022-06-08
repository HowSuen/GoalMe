import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import styles from "./GoalNavigator.style";
import GoalTracker from "../screens/goal-trackers/GoalTracker";
import AcademicTracker from "../screens/goal-trackers/AcademicTracker";
import FitnessTracker from "../screens/goal-trackers/FitnessTracker";
import FinanceTracker from "../screens/goal-trackers/FinanceTracker";
import CompletedGoals from "../screens/goal-trackers/CompletedGoals";

const Drawer = createDrawerNavigator();

export default GoalNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        // headerStyle: styles.container,
        headerTintColor: "black",
        presentation: "modal",
        headerTitleAlign: "center",
        headerShadowVisible: false,
        drawerActiveTintColor: "black",
        drawerInactiveTintColor: "black",
        drawerStyle: styles.container,
      }}
    >
      <Drawer.Screen
        name="Goal Tracker"
        component={GoalTracker}
        options={{
          headerStyle: {backgroundColor: "mediumseagreen"},
          drawerActiveBackgroundColor: "mediumseagreen",
          unmountOnBlur: true,
        }}
      />
      <Drawer.Screen
        name="Academic Tracker"
        component={AcademicTracker}
        options={{
          headerStyle: {backgroundColor: "royalblue"},
          drawerActiveBackgroundColor: "royalblue",
          unmountOnBlur: true,
        }}
      />
      <Drawer.Screen
        name="Fitness Tracker"
        component={FitnessTracker}
        options={{
          headerStyle: {backgroundColor: "tomato"},
          drawerActiveBackgroundColor: "tomato",
          unmountOnBlur: true,
        }}
      />
      <Drawer.Screen
        name="Finance Tracker"
        component={FinanceTracker}
        options={{
          headerStyle: {backgroundColor: "goldenrod"},
          drawerActiveBackgroundColor: "goldenrod",
          unmountOnBlur: true,
        }}
      />
      <Drawer.Screen
        name="Completed Goals"
        component={CompletedGoals}
        options={{
          headerStyle: {backgroundColor: "mediumspringgreen"},
          drawerActiveBackgroundColor: "mediumspringgreen",
          unmountOnBlur: true,
        }}
      />
    </Drawer.Navigator>
  );
};
