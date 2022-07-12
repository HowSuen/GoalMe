import { Dimensions, StyleSheet } from "react-native";

const width = (Dimensions.get("window").width / 10) * 9;

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "ghostwhite",
    // marginTop: -20,
  },
  avatar: {
    justifyContent: "center",
    alignItems: "center",
  },
  levelContainer: {
    justifyContent: "flex-start",
    paddingVertical: 5,
  },
  experience: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
    width: width,
  },
  generalLvl: {
    fontSize: 16,
    color: "green",
    marginRight: 15,
    fontWeight: "bold",
  },
  wisdomLvl: {
    fontSize: 16,
    color: "royalblue",
    marginRight: 15,
    fontWeight: "bold",
  },
  strengthLvl: {
    fontSize: 16,
    color: "tomato",
    marginRight: 15,
    fontWeight: "bold",
  },
  moneyLvl: {
    fontSize: 16,
    color: "goldenrod",
    marginRight: 15,
    fontWeight: "bold",
  },
  bar: {
    flexDirection: "row",
    alignItems: "center",
  },
  achievementContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: width,
  },
  achievement: {
    width: 150,
    height: 150,
  },
  achievementText: {
    fontSize: 20,
    color: "#2d2b2c",
    fontWeight: "bold",
    paddingTop: 5,
  }
});
