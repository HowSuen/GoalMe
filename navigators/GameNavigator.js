import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GameScreen from "../screens/game/GameScreen";
import AchievementsScreen from "../screens/game/AchievementsScreen";

const Stack = createNativeStackNavigator();

export default GameNavigator = ({ navigation, session }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="GameScreen">
        {() => <GameScreen session={session} navigation={navigation} />}
      </Stack.Screen>
      <Stack.Screen
        name="Achievements"
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
        {() => <AchievementsScreen session={session} navigation={navigation} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};