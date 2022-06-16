import React, { useState, useEffect } from "react";
import { View, Text, Dimensions } from "react-native";
import { Card, Image } from "react-native-elements";
import { Bar } from "react-native-progress";
import { useIsFocused } from "@react-navigation/native";
import supabase from "../../lib/supabase";
import AchievementList from "../../components/game/AchievementList";
import styles from "./AchievementsScreen.style";

const AchievementsScreen = ({ navigation, session }) => {
  const user = supabase.auth.user();
  const isFocused = useIsFocused();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (session) {
      getAchievements();
    }
  }, [session, isFocused]);

  const getAchievements = async () => {
    try {
      if (!user) throw new Error("No user on the session!");

      let { data, error, status } = await supabase
        .from("achievements")
        .select()
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setCount(data.count);
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Card
        containerStyle={{
          backgroundColor: "rgba(245,242,234,1.0)",
          padding: 5,
          paddingRight: 10,
          marginTop: 0,
        }}
      >
        <View style={styles.countContainer}>
          <Image
            style={styles.achievement}
            source={require("../../assets/achievement_logo_alt.png")}
          />
          <View style={styles.rightContainer}>
            <Text style={styles.achievementText}>
              Achievements Completed: {count}
            </Text>
            <Text style={styles.percentage}>
              {Math.round((count / 28) * 100)}%
            </Text>
            <Bar
              progress={Math.round((count / 28) * 100) / 100}
              width={(Dimensions.get("window").width / 10) * 5.6}
              height={8}
              unfilledColor="lightgray"
              color={"#987e59"}
              borderWidth={0}
              animationConfig={{ bounciness: 5 }}
            />
          </View>
        </View>
      </Card>
      <AchievementList navigation={navigation} session={session} />
    </View>
  );
};

export default AchievementsScreen;
