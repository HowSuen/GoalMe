import React, { useState } from "react";
import { View } from "react-native";
import SavedAvatar from "../../components/game/SavedAvatar";
import styles from "./GameScreen.style";
import LevelBar from "../../components/game/LevelBar";

const GameScreen = ({ navigation, session }) => {

  const [generalXp, setGeneralXp] = useState(0);
  const [wisdom, setWisdom] = useState(0);
  const [strength, setStrength] = useState(0);
  const [money, setMoney] = useState(0);

  const generalLvl = 0;
  const strengthLvl = 0;
  const wisdomLvl = 0;
  const moneyLvl = 0;

  const generalProgress = 0.3;
  const strengthProgress = 0.4;
  const wisdomProgress = 0.5;
  const moneyProgress = 0.6;

  /**
   * xp / xp_at_that_level = level, remainder leftover_xp
   * progress = leftover_xp / xp_at_new_level
   */

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <SavedAvatar size={250} session={session} />
      </View>
      <View style={styles.levelContainer}>
        <LevelBar
          type="LEVEL"
          color="green"
          level={generalLvl}
          progress={generalProgress}
        />
        <LevelBar
          type="WISDOM"
          color="royalblue"
          level={wisdomLvl}
          progress={strengthProgress}
        />
        <LevelBar
          type="STRENGTH"
          color="tomato"
          level={strengthLvl}
          progress={wisdomProgress}
        />
        <LevelBar
          type="MONEY"
          color="goldenrod"
          level={moneyLvl}
          progress={moneyProgress}
        />
      </View>
    </View>
  );
};

export default GameScreen;
