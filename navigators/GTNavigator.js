import React from "react";
import styles from "./GTNavigator.style";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AcademicTracker from "../screens/goal-trackers/AcademicTracker";
import FitnessTracker from "../screens/goal-trackers/FitnessTracker";
import FinanceTracker from "../screens/goal-trackers/FinanceTracker";

const Drawer = createDrawerNavigator();

const GTNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#222222" },
        headerTintColor: "white",
        presentation: "modal",
        headerTitleAlign: "center",
        drawerActiveBackgroundColor: "springgreen",
      }}
    >
      <Drawer.Screen
        name="Academic Tracker"
        component={AcademicTracker}
      />
      <Drawer.Screen
        name="Fitness Tracker"
        component={FitnessTracker}
      />
      <Drawer.Screen
        name="Finance Tracker"
        component={FinanceTracker}
      />
    </Drawer.Navigator>
  );
};

export default GTNavigator;