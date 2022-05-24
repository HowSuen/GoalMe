import React from "react";
import styles from "./GoalTrackers.style";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AcademicTracker from "./AcademicTracker";
import FitnessTracker from "./FitnessTracker";
import FinanceTracker from "./FinanceTracker";

const Drawer = createDrawerNavigator();

const GoalTrackers = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#222222" },
        headerTintColor: "white",
        presentation: "modal",
        headerTitleAlign: "center",
      }}
    >
      <Drawer.Screen
        name="Academic Tracker"
        style={styles.componentContainer}
        component={AcademicTracker}
      />
      <Drawer.Screen
        name="Fitness Tracker"
        style={styles.componentContainer}
        component={FitnessTracker}
      />
      <Drawer.Screen
        name="Finance Tracker"
        style={styles.componentContainer}
        component={FinanceTracker}
      />
    </Drawer.Navigator>
  );
};

export default GoalTrackers;