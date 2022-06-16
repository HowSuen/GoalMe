import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import Auth from "../screens/auth/Auth";
import CreateAcct from "../screens/auth/CreateAcct";

const Stack = createNativeStackNavigator();

export default AuthNavigation = () => {
  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Auth} />
        <Stack.Screen options={{title:"Register your account"}} name="Signup" component={CreateAcct} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};