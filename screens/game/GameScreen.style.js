import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "ghostwhite",
  },
  avatar: {
    justifyContent: "center",
  },
  levelContainer: {
    justifyContent: "flex-start",
    paddingBottom: 5,
    borderBottomColor: "black",
    borderBottomWidth: 0.5,
  },
  experience: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
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
  }
});
