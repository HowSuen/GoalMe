import React, { useState, useEffect } from "react";
import { View, Text, Alert, Dimensions } from "react-native";
import { Badge } from "react-native-elements";
import { Bar } from "react-native-progress";
import supabase from "../../lib/supabase";
import { useIsFocused } from "@react-navigation/native";
import SavedAvatar from "../../components/game/SavedAvatar";
import LevelBar from "../../components/game/LevelBar";
import styles from "./GameScreen.style";

const GameScreen = ({ navigation, session }) => {

  // Current xp. Reset to 0 each time you level up.
  const [totalXp, setTotalXp] = useState(0);
  const [wisdomXp, setWisdomXp] = useState(0);
  const [strengthXp, setStrengthXp] = useState(0);
  const [wealthXp, setWealthXp] = useState(0);

  // Current level.
  const [totalLvl, setTotalLvl] = useState(1);
  const [strengthLvl, setStrengthLvl] = useState(1);
  const [wisdomLvl, setWisdomLvl] = useState(1);
  const [wealthLvl, setWealthLvl] = useState(1);

  const totalMax = Math.round(Math.pow(totalLvl / 0.07, 2));
  const strengthMax = Math.round(Math.pow(strengthLvl / 0.07, 2));
  const wisdomMax = Math.round(Math.pow(wisdomLvl / 0.07, 2));
  const wealthMax = Math.round(Math.pow(wealthLvl / 0.07, 2));

  const totalProgress = totalXp / totalMax;
  const strengthProgress = strengthXp / strengthMax;
  const wisdomProgress = wisdomXp / wisdomMax;
  const wealthProgress = wealthXp / wealthMax;

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
        setWealthXp(data.wealthXP);
        setWealthLvl(data.wealthLvl);
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <SavedAvatar size={180} session={session} />
        <Badge
          value={totalLvl}
          status="success"
          badgeStyle={{ width: 30, height: 30, borderRadius: 30 }}
          textStyle={{ fontSize: 20, fontWeight: "bold" }}
          containerStyle={{ marginTop: -20 }}
        />
      </View>
      <View style={styles.experience}>
        <Text style={styles.generalLvl}>LEVEL</Text>
        <Bar
          progress={totalProgress}
          height={16}
          width={(Dimensions.get("window").width / 10) * 7}
          unfilledColor="lightgray"
          color={"mediumspringgreen"}
          borderWidth={0}
          animationConfig={{ bounciness: 5 }}
        />
      </View>
      <View style={styles.levelContainer}>
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
          type="WEALTH"
          color="goldenrod"
          level={wealthLvl}
          progress={wealthProgress}
        />
      </View>
    </View>
  );
};

export default GameScreen;
