import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Card, Image } from "react-native-elements";
import LevelBar from "../../components/game/LevelBar";
import MainLevel from "../../components/game/MainLevel";
import styles from "./GameScreen.style";

const GameScreen = ({ navigation, session }) => {
  return (
    <View style={styles.container}>
      <Card
        containerStyle={{
          padding: 5,
          backgroundColor: "white",
          elevation: 15,
          borderRadius: 10,
        }}
      >
        <MainLevel session={session} />
      </Card>
      <Card
        containerStyle={{
          padding: 5,
          backgroundColor: "white",
          elevation: 10,
          borderRadius: 10,
        }}
      >
        <View style={styles.levelContainer}>
          <LevelBar type="WISDOM" session={session} />
          <LevelBar type="STRENGTH" session={session} />
          <LevelBar type="WEALTH" session={session} />
        </View>
      </Card>
      <Card
        containerStyle={{
          padding: 5,
          backgroundColor: "white",
          elevation: 10,
          borderRadius: 10,
        }}
      >
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Game", {
              screen: "Achievements",
            })
          }
          style={styles.achievementContainer}
        >
          <Image
            style={styles.achievement}
            source={require("../../assets/achievement_logo_alt.png")}
          />
          <Text style={styles.achievementText}>Achievements Completed</Text>
        </TouchableOpacity>
      </Card>
    </View>
  );
};

export default GameScreen;
