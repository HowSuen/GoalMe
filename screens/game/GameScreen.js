import React, { useState, useEffect } from "react";
import { View, Alert } from "react-native";
import supabase from "../../lib/supabase";
import { useIsFocused } from "@react-navigation/native";
import styles from "./GameScreen.style";
import SavedAvatar from "../../components/game/SavedAvatar";
import LevelBar from "../../components/game/LevelBar";

const GameScreen = ({ navigation, session }) => {
  const [totalXp, setTotalXp] = useState(0);
  const [wisdomXp, setWisdomXp] = useState(0);
  const [strengthXp, setStrengthXp] = useState(0);
  const [moneyXp, setMoneyXp] = useState(0);

  const [totalLvl, setTotalLvl] = useState(0);
  const [strengthLvl, setStrengthLvl] = useState(0);
  const [wisdomLvl, setWisdomLvl] = useState(0);
  const [moneyLvl, setMoneyLvl] = useState(0);

  const totalProgress = 0.3;
  const strengthProgress = 0.4;
  const wisdomProgress = 0.5;
  const moneyProgress = 0.6;

  /**
   * xp / xp_at_that_level = level, remainder leftover_xp
   * progress = leftover_xp / xp_at_new_level
   *
   * XP PER LEVEL = (LEVEL / X) ^ Y
   * X = 0.07      Lower X, More XP required per level
   * Y = 2         Higher Y, Larger gaps between levels
   */

  const isFocused = useIsFocused();

  useEffect(() => {
    if (session) getProfile();
  }, [session, isFocused]);

  const getProfile = async () => {
    try {
      const user = supabase.auth.user();
      if (!user) throw new Error("No user on the session!");

      let { data, error, status } = await supabase
        .from("experience")
        .select()
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setTotalXp(data.totalXP);
        setTotalLvl(data.totalLvl);
        setWisdomXp(data.wisdomXP);
        setWisdomLvl(data.wisdomLvl);
        setStrengthXp(data.strengthXP);
        setStrengthLvl(data.strengthLvl);
        setMoneyXp(data.moneyXP);
        setMoneyLvl(data.moneyLvl);
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <SavedAvatar size={250} session={session} />
      </View>
      <View style={styles.levelContainer}>
        <LevelBar
          type="LEVEL"
          color="green"
          level={totalLvl}
          progress={totalProgress}
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
