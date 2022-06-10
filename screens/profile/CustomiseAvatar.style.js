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
    padding: 5,
    paddingHorizontal: 16,
    borderRadius: 5,
    elevation: 5,
  },
  avatar: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
    marginBottom: 5,
  },
  menu: {
    backgroundColor: "ghostwhite",
  },
  label: {
    fontSize: 17,
    padding: 10,
    color: "rgb(0, 77, 153)",
    flex: 0.45,
  },
  slot: {
    paddingBottom: 10,
  },
  save: {
    color: "white",
    fontSize: 17,
    textAlign: "center",
  },
});
