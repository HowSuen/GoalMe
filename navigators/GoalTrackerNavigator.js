import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import GoalNavigator from "./GoalNavigator";
import CompletedGoals from "../screens/goal-trackers/CompletedGoals";
import {
  getFocusedRouteNameFromRoute,
  useNavigation,
} from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text } from "react-native-elements";
import { StyleSheet } from "react-native";

const Drawer = createDrawerNavigator();

const showHeaderAndroid = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route);

  if (
    routeName == "GoalEditor" ||
    routeName == "GoalSetter" ||
    routeName == "Modules" ||
    routeName == "ModuleSetter" ||
    routeName == "ModuleEditor"
  ) {
    return false;
  }
  return true;
};

const showHeaderIOS = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route);

  if (
    routeName == "Modules" ||
    routeName == "ModuleSetter" ||
    routeName == "ModuleEditor"
  ) {
    return false;
  }
  return true;
};

export default GoalTrackerNavigator = () => {
  const navigation = useNavigation();

  return (
    <Drawer.Navigator
      screenOptions={({ route }) => ({
        headerShown:
          Platform.OS === "ios"
            ? showHeaderIOS(route)
            : showHeaderAndroid(route),
        headerTintColor: "black",
        presentation: "modal",
        headerTitleAlign: "center",
        headerShadowVisible: false,
        drawerActiveTintColor: "black",
        drawerInactiveTintColor: "black",
        drawerStyle: { backgroundColor: "ghostwhite" },
        unmountOnBlur: true,
      })}
    >
      <Drawer.Screen
        name="Goal Tracker"
        options={{
          headerStyle: { backgroundColor: "mediumseagreen" },
          drawerActiveBackgroundColor: "mediumseagreen",
        }}
      >
        {({ route, navigation }) =>
          GoalNavigator({ route: route, navigation: navigation })
        }
      </Drawer.Screen>
      <Drawer.Screen
        name="Academic Tracker"
        options={{
          headerStyle: { backgroundColor: "royalblue" },
          drawerActiveBackgroundColor: "royalblue",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Modules");
              }}
              style={styles.button}
            >
              <Text style={styles.text}>Modules</Text>
            </TouchableOpacity>
          ),
        }}
      >
        {({ route, navigation }) =>
          GoalNavigator({ route: route, navigation: navigation })
        }
      </Drawer.Screen>
      <Drawer.Screen
        name="Fitness Tracker"
        options={{
          headerStyle: { backgroundColor: "tomato" },
          drawerActiveBackgroundColor: "tomato",
        }}
      >
        {({ route, navigation }) =>
          GoalNavigator({ route: route, navigation: navigation })
        }
      </Drawer.Screen>
      <Drawer.Screen
        name="Finance Tracker"
        options={{
          headerStyle: { backgroundColor: "goldenrod" },
          drawerActiveBackgroundColor: "goldenrod",
        }}
      >
        {({ route, navigation }) =>
          GoalNavigator({ route: route, navigation: navigation })
        }
      </Drawer.Screen>
      <Drawer.Screen
        name="Completed Goals"
        component={CompletedGoals}
        options={{
          headerStyle: { backgroundColor: "mediumaquamarine" },
          drawerActiveBackgroundColor: "mediumaquamarine",
        }}
      />
    </Drawer.Navigator>
  );
};
const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 28,
    backgroundColor: "orange",
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
    padding: 5,
    paddingHorizontal: 10,
    color: "black",
  },
});
