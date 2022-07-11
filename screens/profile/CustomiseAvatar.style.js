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
    alignItems: "center",
    paddingTop: 5,
    paddingBottom: 10,
    backgroundColor: "ghostwhite",
  },
  saveButton: {
    marginRight: 20,
    marginLeft: 20,
    marginBottom: Platform.OS == "ios" ? 30 : 0,
    marginTop: Platform.OS == "ios" ? -10 : 0,
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 20,
    backgroundColor: "rgb(69,190,219)",
    borderRadius: Platform.OS == "ios" ? 5 : 30,
    elevation: 5,
    width: 100,
  },
  avatar: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.1)"
  },
  menu: {
    backgroundColor: "ghostwhite",
    marginBottom: Platform.OS === "ios" ? 20 : 0,
  },
  label: {
    fontSize: 17,
    padding: 10,
    color: "rgb(17, 74, 89)",
    flex: 0.45,
  },
  slot: {
    paddingBottom: 10,
  },
  save: {
    color: "rgb(17, 74, 89)",
    fontSize: 17,
    textAlign: "center",
  },
});
