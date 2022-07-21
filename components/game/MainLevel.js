import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Alert,
  Dimensions,
  StyleSheet,
  StatusBar,
} from "react-native";
import { Badge } from "react-native-elements";
import { Bar } from "react-native-progress";
import supabase from "../../lib/supabase";
import { useIsFocused } from "@react-navigation/native";
import SavedAvatar from "../../components/game/SavedAvatar";
import Tooltip from "react-native-walkthrough-tooltip";
import { TouchableWithoutFeedback } from "react-native";

const MainLevel = ({ session }) => {
  const isFocused = useIsFocused();
  const [mainVisible, setMainVisible] = useState(false);

  const [totalXp, setTotalXp] = useState(0);
  const [totalLvl, setTotalLvl] = useState(1);

  useEffect(() => {
    if (session) {
      getExperience();
    }
  }, [session, isFocused]);

  const getExperience = async () => {
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
        setTotalLvl(data.totalLVL);
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
          badgeStyle={{ minWidth: 30, height: 30, borderRadius: 30 }}
          textStyle={{ fontSize: 20, fontWeight: "bold" }}
          containerStyle={{ marginTop: -20 }}
        />
      </View>
      <TouchableWithoutFeedback onPress={() => setMainVisible(true)}>
        <View style={styles.experience}>
          <Tooltip
            isVisible={mainVisible}
            onClose={() => setMainVisible(false)}
            content={
              <View>
                <Text style={{ color: "white" }}>
                  {totalXp} / {Math.round(Math.pow(totalLvl / 0.05, 1.6))} XP (
                  {Math.round(
                    (totalXp / Math.round(Math.pow(totalLvl / 0.05, 1.6))) * 100
                  )}
                  %)
                </Text>
                <Text style={{ color: "white" }}>
                  {Math.round(Math.pow(totalLvl / 0.05, 1.6)) - totalXp} XP to
                  Next Level
                </Text>
              </View>
            }
            placement="top"
            topAdjustment={
              Platform.OS === "android" ? -StatusBar.currentHeight : 0
            }
            contentStyle={{ backgroundColor: "mediumseagreen" }}
            showChildInTooltip={false}
          >
            <Text style={styles.generalLvl}>LEVEL</Text>
          </Tooltip>
          <Bar
            progress={totalXp / Math.round(Math.pow(totalLvl / 0.05, 1.6))}
            height={14}
            width={(Dimensions.get("window").width / 10) * 7}
            unfilledColor="#BFC5CC"
            color={"mediumseagreen"}
            borderWidth={0}
            animationConfig={{ bounciness: 10 }}
            borderRadius={20}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default MainLevel;

const styles = StyleSheet.create({
  avatar: {
    justifyContent: "center",
    alignItems: "center",
  },
  experience: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
    width: (Dimensions.get("window").width / 10) * 9,
  },
  generalLvl: {
    fontSize: 16,
    color: "green",
    marginRight: 15,
    fontWeight: "bold",
  },
});
