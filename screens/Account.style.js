import { StyleSheet, DarkTheme } from "react-native";

export default StyleSheet.create({
  container: {
    padding: 15,
    justifyContent: "center",
    flex: 1,
    backgroundColor: "ghostwhite",
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
  },
  verticallySpaced: {
    paddingTop: 5,
    paddingBottom: 5,
    alignSelf: "stretch",
  },
  textInput: {
    color: "black",
  },
  button: {
    marginRight: 20,
    marginLeft: 20,
    marginTop: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "dodgerblue",
    borderRadius: 5,
  },
  buttonText: {
    color: "black",
    fontSize: 17,
    textAlign: "center",
  },
  avatarButton: {
    backgroundColor: "dodgerblue",
    padding: 5,
    borderRadius: 5,
  },
});
