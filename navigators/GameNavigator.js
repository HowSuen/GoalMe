import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GameScreen from "../screens/game/GameScreen";
import AchievementsScreen from "../screens/game/AchievementsScreen";

const Stack = createNativeStackNavigator();

export default GameNavigator = ({ navigation, session }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="GameScreen"
        options={{
          headerShown: true,
          headerTitle: "Game",
          headerStyle: { backgroundColor: "#3A637A" },
          headerTintColor: "#F5F2EA",
          headerShadowVisible: true,
          presentation: "card",
          headerTitleAlign: "center",
        }}
      >
        {() => <GameScreen session={session} navigation={navigation} />}
      </Stack.Screen>
      <Stack.Screen
        name="Achievements"
        options={{
          headerShown: true,
          headerTitle: "Achievements",
          headerStyle: { backgroundColor: "#3A637A" },
          headerTintColor: "#F5F2EA",
          headerShadowVisible: true,
          presentation: "card",
          headerTitleAlign: "center",
        }}
      >
        {() => <AchievementsScreen session={session} navigation={navigation} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
