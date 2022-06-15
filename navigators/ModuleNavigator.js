import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Modules from "../screens/goal-trackers/Modules";
import ModuleSetter from "../screens/goal-trackers/ModuleSetter";
import ModuleEditor from "../screens/goal-trackers/ModuleEditor";

const Stack = createNativeStackNavigator();

export default ModuleNavigator = ({ route, navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, unmountOnBlur: true }}
    >
      <Stack.Screen name="Modules2" component={Modules} />
      <Stack.Screen
        name="ModuleSetter"
        options={{
          headerShown: true,
          headerTitle: "Add your modules",
          headerStyle: { backgroundColor: "ghostwhite" },
          headerTintColor: "black",
          presentation: "modal",
          headerTitleAlign: "center",
        }}
      >
        {() => <ModuleSetter route={route} navigation={navigation} />}
      </Stack.Screen>
      <Stack.Screen
        name="ModuleEditor"
        options={{
          headerShown: true,
          headerTitle: "",
          headerStyle: { backgroundColor: "ghostwhite" },
          headerTintColor: "black",
          headerShadowVisible: false,
          presentation: "card",
          headerTitleAlign: "center",
        }}
      >
        {() => <ModuleEditor route={route} navigation={navigation} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
