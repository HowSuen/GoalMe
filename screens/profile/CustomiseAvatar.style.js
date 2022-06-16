import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: "ghostwhite",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "stretch",
    marginTop: 5,
    marginBottom: 50,
  },
  saveButton: {
    marginRight: 20,
    marginLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 20,
    backgroundColor: "dodgerblue",
    borderRadius: 5,
    elevation: 5,
  },
  avatar: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 1,
    marginBottom: 5,
  },
  menu: {
    backgroundColor: "ghostwhite",
    marginBottom: 20,
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
