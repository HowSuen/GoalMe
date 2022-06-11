import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    padding: 15,
    justifyContent: "center",
    flex: 1,
    backgroundColor: "ghostwhite",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },
  formContainer: {
    marginTop: 0,
  },
  inputContainer: {
    paddingTop: 5,
    paddingBottom: 5,
    alignSelf: "stretch",
  },
  textInput: {
    color: "black",
  },
  dropdownContainer: {
    paddingTop: 10,
    paddingBottom: 25,
    alignSelf: "stretch",
  },
  dropdownLabel: {
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 10,
    paddingBottom: 10,
    color: "lightslategrey",
  },
  buttonText: {
    color: "white",
    fontSize: 17,
    textAlign: "center",
  },
  button: {
    backgroundColor: "dodgerblue",
    padding: 10,
    width: 90,
    borderRadius: 5,
    elevation: 10,
  },
});
