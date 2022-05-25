import { StyleSheet } from "react-native";

export default StyleSheet.create({
  componentContainer: {
    flexDirection: "row",
    justifyContent: "center",
    height: "auto",
    width: "auto",
    marginTop: 20,
  },
  listContainer: {
    height: "auto",
    width: 350,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "dodgerblue",
  },
  circleContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 10,
  },
  listText: {
    color: "black",
    width: 260,
    height: "auto",
    fontSize: 20,
    marginTop: 10,
    marginRight: 10,
  },
  listSubtext: {
    color: "darkslategrey",
    fontSize: 12,
    marginRight: 20,
    borderRadius: 10,
    width: 60,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    marginTop: 15,
    height: 40,
    borderRadius: 10,
  },
});