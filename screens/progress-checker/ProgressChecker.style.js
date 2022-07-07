import { Dimensions, StyleSheet } from "react-native";

const width = (Dimensions.get("window").width / 10) * 9;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "ghostwhite",
    justifyContent: "center",
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
    width: 100,
    height: 100,
  },
  scrollView: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "ghostwhite",
  },
  topRowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  topRowCard: {
    padding: 20,
    flex: 1,
    alignSelf: "stretch",
  },
  topRowCardText: {
    justifyContent: "center",
    alignSelf: "center",
    paddingBottom: 10,
    fontSize: 30,
    fontWeight: "bold",
  },
});
