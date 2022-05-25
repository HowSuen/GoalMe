import { StyleSheet, DarkTheme } from "react-native";

export default StyleSheet.create({
  container: {
    padding: 15,
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#222222",
  },
  avatarContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
    flex: 1,
  },
  avatar: {
    height: 200,
    width: 200,
  },
  formContainer: {
    marginTop: 50,
    flex: 1.5,
  },
  verticallySpaced: {
    paddingTop: 5,
    paddingBottom: 5,
    alignSelf: "stretch",
  },
  textInput: {
    color: "white",
  },
  button: {
    marginRight: 20,
    marginLeft: 20,
    marginTop: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "mediumspringgreen",
    borderRadius: 5,
  },
  buttonText: {
    color: "black",
    fontSize: 17,
    textAlign: "center",
  },
});
