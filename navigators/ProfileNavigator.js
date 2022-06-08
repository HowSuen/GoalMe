import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Account from "../screens/Account";
import CustomiseAvatar from "../screens/CustomiseAvatar";

const Stack = createNativeStackNavigator();

export default ProfileNavigation = ({ navigation, session }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Account">
        {() => <Account session={session} navigation={navigation} />}
      </Stack.Screen>
      <Stack.Screen
        name="CustomiseAvatar"
        options={{
          headerShown: true,
          headerTitle: "Customise your Avatar",
          headerStyle: {backgroundColor: "#222222"},
          headerTintColor: "white",
          presentation: "modal",
          headerTitleAlign: "center",
        }}
      >
        {() => <CustomiseAvatar navigation={navigation} session={session} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
