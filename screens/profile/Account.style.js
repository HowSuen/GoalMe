import { StyleSheet, DarkTheme, Platform } from "react-native";

export default StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    backgroundColor: "rgb(36,184,249)",
  },
  avatarContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    height: 200,
    width: 200,
  },
  formContainer: {
    marginTop: 0,
    backgroundColor: "ghostwhite",
    padding: 15,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  verticallySpaced: {
    paddingTop: 10,
    alignSelf: "stretch",
  },
  textInput: {
    color: "black",
  },
  button: {
    marginTop: 30,
    paddingTop: 10,
    paddingBottom: 10,
    width: 200,
    backgroundColor: "dodgerblue",
    borderRadius: Platform.OS == "ios" ? 5 : 30,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 17,
    textAlign: "center",
  },
  avatarButton: {
    backgroundColor: "ghostwhite",
    padding: 5,
    borderRadius: 15,
    elevation: 10,
    margin: 10,
    marginTop: 0,
  },
});
