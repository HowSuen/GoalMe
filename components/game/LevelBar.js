import React from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { Bar } from "react-native-progress";

const width = (Dimensions.get("window").width / 10) * 9;
const xpBarWidth = (Dimensions.get("window").width / 10) * 5.5;

const LevelBar = ({ type, color, level, progress }) => {
  return (
    <View style={styles.experience}>
      <Text style={[styles.generalLvl, { color: color }]}>{type}</Text>
      <View style={styles.bar}>
        <Text style={[styles.generalLvl, { color: color }]}>{level}</Text>
        <Bar
          progress={progress}
          width={xpBarWidth}
          height={16}
          unfilledColor="lightgray"
          color={type == "LEVEL" ? "mediumspringgreen" : color}
          borderWidth={0}
          animationConfig={{bounciness: 5,}}
        />
      </View>
    </View>
  );
};

export default LevelBar;

const styles = StyleSheet.create({
  experience: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
    width: width,
  },
  generalLvl: {
    fontSize: 16,
    marginRight: 15,
    fontWeight: "bold",
  },
  bar: {
    flexDirection: "row",
    alignItems: "center",
  },
});
