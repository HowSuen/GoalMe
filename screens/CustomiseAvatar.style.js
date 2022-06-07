import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: "black",
  },
  saveButton: {
    justifyContent: "center",
    backgroundColor: "mediumspringgreen",
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
    backgroundColor: "#222222",
  },
  label: {
    fontSize: 16,
    padding: 10,
    color: "white",
    flex: 0.45,
  },
  slot: {
    paddingBottom: 10,
  },
});
