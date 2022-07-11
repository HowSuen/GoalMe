import { Dimensions, StyleSheet, Platform } from "react-native";

const width = (Dimensions.get("window").width / 10) * 9;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "ghostwhite",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 5,
  },
  cardContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: width,
    height: Platform.OS == "ios" ? 150 : 120,
  },
  cardText: {
    fontSize: Platform.OS === "ios" ? 21 : 25,
    fontWeight: "bold",
    color: "black",
    opacity: 0.8,
    minWidth: 120,
    height: Platform.OS == "ios" ? 150 : 120,
    lineHeight: Platform.OS == "ios" ? 150 : 120,
    textAlignVertical: "center",
    textAlign: "center",
  },
  cardIcon: {
    width: Platform.OS === "ios" ? 90 : 80,
    height: Platform.OS === "ios" ? 90 : 80,
  },
  scrollView: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "ghostwhite",
    paddingBottom: Platform.OS === "ios" ? 0 : 10,
  },
  topRowContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  topRowCard: {
    paddingVertical: 20,
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "center",
    borderRadius: 5,
    elevation: 5,
  },
  topRowCardText: {
    justifyContent: "center",
    alignSelf: "center",
    paddingBottom: 10,
    fontSize: 30,
    fontWeight: "bold",
  },
});
