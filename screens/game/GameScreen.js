import React from "react";
import { View } from "react-native";
import { Card } from "react-native-elements";
import LevelBar from "../../components/game/LevelBar";
import MainLevel from "../../components/game/MainLevel";
import styles from "./GameScreen.style";

const GameScreen = ({ navigation, session }) => {

  return (
    <View style={styles.container}>
      <Card containerStyle={{ padding: 5 }}>
        <MainLevel session={session}/>
      </Card>
      <Card containerStyle={{ padding: 5 }}>
        <View style={styles.levelContainer}>
          <LevelBar
            type="WISDOM"
            session={session}
          />
          <LevelBar
            type="STRENGTH"
            session={session}
          />
          <LevelBar
            type="WEALTH"
            session={session}
          />
        </View>
      </Card>
    </View>
  );
};

export default GameScreen;
