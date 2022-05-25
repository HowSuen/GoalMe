import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    padding: 15,
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#222222",
  },
  logoContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
  },
  logo: {
    height: 200,
    width: 200,
  },
  formContainer: {
    marginTop: 50,
  },
  signUpButton: {
    marginRight: 100,
    marginLeft: 100,
    marginTop: 20,
    paddingTop: 5,
    paddingBottom: 5,
  },
  signUpText: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
  },
});