import React from "react";
import { View, Image, Text } from "react-native";
import styles from "./Empty.style";

export default Empty = ({ text }) => {
  displayText = text || "No goals added."
  return (
    <View style={styles.container}>
      <Image style={styles.emptyImage} source={require("../../assets/empty-goals.png")} />
      <Text style={styles.emptyText}>{displayText}</Text>
    </View>
  );
}
