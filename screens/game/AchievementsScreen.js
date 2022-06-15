import React from "react";
import { View, Text, Dimensions } from "react-native";
import { Card, Image } from "react-native-elements";
import { Bar } from "react-native-progress";
import styles from "./AchievementsScreen.style";

const AchievementsScreen = ({ navigation, session }) => {

  return (
    <View style={styles.container}>
      <Card containerStyle={{ padding: 5, paddingRight: 10 }}>
        <View style={styles.countContainer}>
          <Image
            style={styles.achievement}
            source={require("../../assets/achievement_logo_alt.png")}
          />
          <View style={styles.rightContainer}>
            <Text style={styles.achievementText}>
              Achievements Completed: 420
            </Text>
            <Text style={styles.percentage}>69%</Text>
            <Bar
              progress={0.69}
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
      <View style={styles.listContainer}>
      </View>
    </View>
  );
};

export default AchievementsScreen;
