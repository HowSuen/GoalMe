import { Dimensions, StyleSheet } from "react-native";

const width = (Dimensions.get("window").width / 10) * 9;

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "ghostwhite",
  },
  achievementText: {
    fontSize: 16,
    color: "#2d2b2c",
    fontWeight: "bold",
    marginBottom: 5,
  },
  percentage: {
    fontSize: 32,
    color: "#987e59",
    fontWeight: "bold",
    marginBottom: 10,
  },
  achievement: {
    width: 100,
    height: 100,
    margin: 5,
  },
  countContainer: {
    width: width,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rightContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    justifyContent: "center",
    alignItems: "center",
  }
});
