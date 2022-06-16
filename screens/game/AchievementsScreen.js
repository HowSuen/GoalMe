import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import AchievementCount from "../../components/game/AchievementCount";
import AchievementList from "../../components/game/AchievementList";
import styles from "./AchievementsScreen.style";

const AchievementsScreen = ({ navigation, session }) => {

  const isFocused = useIsFocused();
  const [state, setState] = useState({});

  useEffect(() => {
    return () => {
      setState({});
    };
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <AchievementCount navigation={navigation} session={session} />
      <AchievementList navigation={navigation} session={session} />
    </View>
  );
};

export default AchievementsScreen;
