import { View, Text, StyleSheet, Platform } from "react-native";

export default AndroidTitle = ({ title }) => {
  return Platform.OS === "ios" ? (
    <></>
  ) : (
    <View style={styles.titleContainer}>
      <Text style={styles.titleText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    justifyContent: "center",
    padding: 10,
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
  },
  titleText: {
    textAlign: "center",
    fontSize: 20,
  },
});
