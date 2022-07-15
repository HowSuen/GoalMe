import { StyleSheet, DarkTheme, Platform } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
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
    backgroundColor: "ghostwhite",
    padding: 15,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  verticallySpaced: {
    paddingTop: 10,
    alignSelf: "stretch",
  },
  buttonText: {
    color: "white",
    fontSize: 17,
    textAlign: "center",
  },
  signOutButton: {
    paddingVertical: 10,
    width: 200,
    borderWidth: 1,
    borderColor: "red",
    backgroundColor: "ghostwhite",
    borderRadius: Platform.OS == "ios" ? 5 : 30,
    elevation: 5,
  },
  signOutText: {
    color: "red",
    fontSize: 17,
    textAlign: "center",
  },
  avatarButton: {
    backgroundColor: "ghostwhite",
    padding: 5,
    paddingHorizontal: 7,
    borderRadius: 15,
    elevation: 10,
    margin: 10,
    marginTop: 0,
  },
});
