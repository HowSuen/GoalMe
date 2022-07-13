import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    padding: 15,
    justifyContent: "center",
    flex: 1,
    backgroundColor: "rgb(213,244,255)",
  },
  logoContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
  logo: {
    height: 200,
    width: 200,
    marginRight: -40,
  },
  title: {
    height: 40,
    width: 144,
  }
});