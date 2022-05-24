import { StyleSheet, DarkTheme } from "react-native";

export default StyleSheet.create({
  container: {
    padding: 15,
    justifyContent: "center",
    flex: 1,
    theme: { DarkTheme },
  },
  logoContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
    flex: 1,
  },
  logo: {
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
    marginRight: 100,
    marginLeft: 100,
    marginTop: 20,
    paddingTop: 5,
    paddingBottom: 5,
  },
  buttonText: {
    color: "black",
    fontSize: 18,
    textAlign: "center",
  },
});
