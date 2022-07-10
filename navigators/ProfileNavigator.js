import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Account from "../screens/profile/Account";
import CustomiseAvatar from "../screens/profile/CustomiseAvatar";
import { TouchableOpacity, Alert } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import AlertPrompt from "../components/goal-trackers/AlertPrompt";

const Stack = createNativeStackNavigator();

export default ProfileNavigator = ({ navigation, session }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Account"
        options={{
          headerShown: true,
          headerTitle: "Profile",
          headerStyle: { backgroundColor: "ghostwhite" },
          headerTintColor: "dodgerblue",
          headerShadowVisible: true,
          presentation: "modal",
          headerTitleAlign: "center",
        }}
      >
        {() => <Account session={session} navigation={navigation} />}
      </Stack.Screen>
      <Stack.Screen
        name="CustomiseAvatar"
        options={{
          headerShown: true,
          headerShadowVisible: true,
          headerTitle: "Avatar",
          headerStyle: { backgroundColor: "dodgerblue" },
          headerTintColor: "white",
          presentation: "modal",
          headerTitleAlign: "center",
          headerRight: () => (
            <TouchableOpacity
              onPress={() =>
                Alert.alert(
                  "Avatar Customisation",
                  "Notes:\n- Party Hat is not affected by colours.\n- T-Shirt Graphic only applies to Shirt, Dress Shirt, V-Neck and Tank Top.\n\nEnjoy customising!",
                  [
                    {
                      text: "OK",
                    },
                  ]
                )
              }
            >
              <FontAwesome name="question-circle-o" size={30} color="white" />
            </TouchableOpacity>
          ),
        }}
      >
        {() => <CustomiseAvatar navigation={navigation} session={session} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
