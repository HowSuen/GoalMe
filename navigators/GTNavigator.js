import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import styles from "./GTNavigator.style";
import GoalTracker from "../screens/goal-trackers/GoalTracker";
import AcademicTracker from "../screens/goal-trackers/AcademicTracker";
import FitnessTracker from "../screens/goal-trackers/FitnessTracker";
import FinanceTracker from "../screens/goal-trackers/FinanceTracker";

const Drawer = createDrawerNavigator();

const GTNavigator = () => {
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
        name="Academic Tracker"
        component={AcademicTracker}
        options={{
          drawerActiveBackgroundColor: "royalblue",
        }}
      />
      <Drawer.Screen
        name="Fitness Tracker"
        component={FitnessTracker}
        options={{
          drawerActiveBackgroundColor: "tomato",
        }}
      />
      <Drawer.Screen
        name="Finance Tracker"
        component={FinanceTracker}
        options={{
          drawerActiveBackgroundColor: "goldenrod",
        }}
      />
      <Drawer.Screen
        name="General Tracker"
        component={GoalTracker}
        options={{
          drawerActiveBackgroundColor: "mediumseagreen",
        }}
      />
    </Drawer.Navigator>
  );
};

export default GTNavigator;
