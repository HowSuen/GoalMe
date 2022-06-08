import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: "ghostwhite",
  },
  saveButton: {
    justifyContent: "center",
    backgroundColor: "dodgerblue",
    padding: 10,
    borderRadius: 5,
  },
  avatar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
  },
  menu: {
    backgroundColor: "ghostwhite",
  },
  label: {
    fontSize: 16,
    padding: 10,
    color: "black",
    flex: 0.45,
  },
  slot: {
    paddingBottom: 10,
  },
});
