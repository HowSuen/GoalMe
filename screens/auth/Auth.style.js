import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    padding: 15,
    justifyContent: "center",
    flex: 1,
    backgroundColor: "rgb(213,244,255)",
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    height: 200,
    width: 200,
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    height: 60,
    width: 216,
  },
  formContainer: {
    marginTop: 50,
  },
  signUpButton: {
    marginTop: 20,
    paddingTop: 5,
    paddingBottom: 5,
    alignSelf:"center",
  },
  signUpText: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
  },
  signUpTextR: {
    color: "dodgerblue",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
