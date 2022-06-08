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
        headerStyle: styles.container,
        headerTintColor: "white",
        presentation: "modal",
        headerTitleAlign: "center",
        headerShadowVisible: false,
        drawerActiveTintColor: "black",
        drawerInactiveTintColor: "white",
        drawerStyle: styles.container,
      }}
    >
      <Drawer.Screen
        name="Goal Tracker"
        component={GoalTracker}
        options={{
          drawerActiveBackgroundColor: "mediumseagreen",
          unmountOnBlur: true,
        }}
      />
      <Drawer.Screen
        name="Academic Tracker"
        component={AcademicTracker}
        options={{
          drawerActiveBackgroundColor: "royalblue",
          unmountOnBlur: true,
        }}
      />
      <Drawer.Screen
        name="Fitness Tracker"
        component={FitnessTracker}
        options={{
          drawerActiveBackgroundColor: "tomato",
          unmountOnBlur: true,
        }}
      />
      <Drawer.Screen
        name="Finance Tracker"
        component={FinanceTracker}
        options={{
          drawerActiveBackgroundColor: "goldenrod",
          unmountOnBlur: true,
        }}
      />
      <Drawer.Screen
        name="Completed Goals"
        component={CompletedGoals}
        options={{
          drawerActiveBackgroundColor: "aquamarine",
          unmountOnBlur: true,
        }}
      />
    </Drawer.Navigator>
  );
};
