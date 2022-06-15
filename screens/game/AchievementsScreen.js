import React from "react";
import { View, Text } from "react-native";
import { Card, Image } from "react-native-elements";
import LevelBar from "../../components/game/LevelBar";
import MainLevel from "../../components/game/MainLevel";
import styles from "./AchievementsScreen.style";

const AchievementsScreen = ({ navigation, session }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.achievementText}>Achievements Completed: 420</Text>
    </View>
  );
};

export default AchievementsScreen;
