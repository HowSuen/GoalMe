import React from "react";
import { View, Text, Dimensions, FlatList } from "react-native";
import { Card, Image } from "react-native-elements";
import { Bar } from "react-native-progress";
import styles from "./AchievementsScreen.style";

const AchievementsScreen = ({ navigation, session }) => {
  const data = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "First Item",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Third Item",
    },
  ];

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
        <FlatList
          data={data}
          keyExtractor={(goal) => goal.id}
          renderItem={({ item }) => console.log("hi")}
        />
      </View>
    </View>
  );
};

export default AchievementsScreen;
