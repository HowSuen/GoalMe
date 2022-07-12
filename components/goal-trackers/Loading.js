import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";

export default Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={"large"} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    width: 350,
    height: 350,
  },
});
