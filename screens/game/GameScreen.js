import React, { useState } from "react";
import { View, Text, Dimensions } from "react-native";
import SavedAvatar from "../../components/game/SavedAvatar";
import { Bar } from "react-native-progress";
import styles from "./GameScreen.style";
import LevelBar from "../../components/game/LevelBar";

const GameScreen = ({ navigation, session }) => {
  const xpBarWidth = (Dimensions.get("window").width / 10) * 5.5;

  const [generalXp, setGeneralXp] = useState(0);
  const [wisdom, setWisdom] = useState(0);
  const [strength, setStrength] = useState(0);
  const [money, setMoney] = useState(0);

  const generalLvl = 0;
  const strengthLvl = 0;
  const wisdomLvl = 0;
  const moneyLvl = 0;

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <SavedAvatar size={250} session={session} />
      </View>
      <View style={styles.levelContainer}>
        <View style={styles.experience}>
          <Text style={styles.generalLvl}>LEVEL</Text>
          <View style={styles.bar}>
            <Text style={styles.generalLvl}>{generalLvl}</Text>
            <Bar
              progress={0.3}
              width={xpBarWidth}
              height={16}
              unfilledColor="lightgray"
              color="mediumspringgreen"
              borderWidth={0}
            />
          </View>
        </View>
        <View style={styles.experience}>
          <Text style={styles.wisdomLvl}>WISDOM</Text>
          <View style={styles.bar}>
            <Text style={styles.wisdomLvl}>{wisdomLvl}</Text>
            <Bar
              progress={0.3}
              width={xpBarWidth}
              height={16}
              unfilledColor="lightgray"
              color="royalblue"
              borderWidth={0}
            />
          </View>
        </View>
        <View style={styles.experience}>
          <Text style={styles.strengthLvl}>STRENGTH</Text>
          <View style={styles.bar}>
            <Text style={styles.strengthLvl}>{strengthLvl}</Text>
            <Bar
              progress={0.3}
              width={xpBarWidth}
              height={16}
              unfilledColor="lightgray"
              color="tomato"
              borderWidth={0}
            />
          </View>
        </View>
        <View style={styles.experience}>
          <Text style={styles.moneyLvl}>MONEY</Text>
          <View style={styles.bar}>
            <Text style={styles.moneyLvl}>{moneyLvl}</Text>
            <Bar
              progress={0.3}
              width={xpBarWidth}
              height={16}
              unfilledColor="lightgray"
              color="goldenrod"
              borderWidth={0}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default GameScreen;
