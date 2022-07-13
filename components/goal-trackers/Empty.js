import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

export default Empty = ({ text }) => {
  displayText = text || "No goals added.";
  return (
    <View style={styles.container}>
      <Image
        style={styles.emptyImage}
        source={require("../../assets/empty-goals.png")}
      />
      <Text style={styles.emptyText}>{displayText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },

  emptyImage: {
    width: 350,
    height: 350,
  },

  emptyText: {
    color: "black",
    marginTop: 20,
    fontSize: 28,
  },
});
