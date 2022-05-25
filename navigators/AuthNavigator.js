import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import Auth from "../screens/Auth";
import CreateAcct from "../screens/CreateAcct";

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator screenOptions={{  }}>
        <Stack.Screen name="Login" component={Auth} />
        <Stack.Screen options={{title:"Register your account"}} name="Signup" component={CreateAcct} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNavigation; 