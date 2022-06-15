import React from "react";
import { View, Text, Dimensions } from "react-native";
import { Card, Image } from "react-native-elements";
import LevelBar from "../../components/game/LevelBar";
import MainLevel from "../../components/game/MainLevel";
import styles from "./GameScreen.style";

const GameScreen = ({ navigation, session }) => {
  return (
    <View style={styles.container}>
      <Card containerStyle={{ padding: 5 }}>
        <MainLevel session={session} />
      </Card>
      <Card containerStyle={{ padding: 5 }}>
        <View style={styles.levelContainer}>
          <LevelBar type="WISDOM" session={session} />
          <LevelBar type="STRENGTH" session={session} />
          <LevelBar type="WEALTH" session={session} />
        </View>
      </Card>
      <Card containerStyle={{ padding: 5 }}>
        <View style={styles.achievementContainer}>
          <Image
            style={styles.achievement}
            source={require("../../assets/achievement_logo_alt.png")}
          />
          <Text style={styles.achievementText}>Achievements Completed:</Text>
          <Text style={styles.achievementText}>69</Text>
        </View>
      </Card>
    </View>
  );
};

export default GameScreen;
