import React from "react";
import { View, Text, Dimensions, SectionList } from "react-native";
import { Card, Image } from "react-native-elements";
import { Bar } from "react-native-progress";
import AchievementList from "../../components/game/AchievementList";
import styles from "./AchievementsScreen.style";

const AchievementsScreen = ({ navigation, session }) => {
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
      <AchievementList navigation={navigation} session={session} />
    </View>
  );
};

export default AchievementsScreen;
