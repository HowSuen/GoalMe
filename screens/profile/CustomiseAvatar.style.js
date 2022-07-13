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
    backgroundColor: "dodgerblue",
    borderRadius: Platform.OS == "ios" ? 5 : 30,
    elevation: 5,
    width: 140,
  },
  disabledButton: {
    marginRight: 20,
    marginLeft: 20,
    marginBottom: Platform.OS == "ios" ? 30 : 0,
    marginTop: Platform.OS == "ios" ? -10 : 0,
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 20,
    backgroundColor: "gray",
    borderRadius: Platform.OS == "ios" ? 5 : 30,
    elevation: 5,
    width: 140,
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
    color: "#0d329f",
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
