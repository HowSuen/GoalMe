import React from "react";
import { View, Text } from "react-native";
import SavedAvatar from "../../components/game/SavedAvatar";

const GameScreen = ({ navigation, session }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "ghostwhite",
      }}
    >
      <SavedAvatar size={250} session={session} />
      <Text style={{ color: "black" }}>Game!</Text>
    </View>
  );
};

export default GameScreen;
