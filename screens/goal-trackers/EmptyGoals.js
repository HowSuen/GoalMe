import React from "react";
import { View, Image, Text } from "react-native";
import styles from "./EmptyGoals.style";

export default EmptyGoals = () => {
  return (
    <View style={styles.componentContainer}>
      <Image style={styles.emptyImage} source={require("../../assets/Barry-B-Benson.png")} />
      <Text style={styles.emptyText}>There's nothing to do.</Text>
    </View>
  );
}
