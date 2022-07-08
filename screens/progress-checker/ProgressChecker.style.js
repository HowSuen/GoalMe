import { Dimensions, StyleSheet } from "react-native";

const width = (Dimensions.get("window").width / 10) * 9;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "ghostwhite",
    justifyContent: "center",
    alignItems: "center",
  },
  cardContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: width,
  },
  cardText: {
    fontSize: 20,
    fontWeight: "bold",
    paddingTop: 10,
  },
  cardIcon: {
    width: Platform.OS === "ios" ? 90 : 80,
    height: Platform.OS === "ios" ? 90 : 80,
  },
  scrollView: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "ghostwhite",
    paddingBottom: Platform.OS === "ios" ? 0: 10,
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
