import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import styles from "./GTNavigator.style";
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
        drawerActiveTintColor: "black",
        drawerInactiveTintColor: "white",
        drawerStyle: styles.container,
      }}
      
    >
      <Drawer.Screen
        name="Academic Tracker"
        component={AcademicTracker}
        options={{
          drawerActiveBackgroundColor: "mediumseagreen",
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
          drawerActiveBackgroundColor: "royalblue",
        }}
      />
    </Drawer.Navigator>
  );
};

export default GTNavigator;