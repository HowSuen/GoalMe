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
  },
  formContainer: {
    marginTop: 0,
  },
  inputContainer: {
    marginTop: 10,
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 4,
    borderWidth: 1,
    alignSelf: "stretch",
    backgroundColor: "white",
  },
  textInput: {
    color: "black",
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
    marginTop: 15,
  },
  disabledButton: {
    backgroundColor: "gray",
    padding: 10,
    width: 90,
    borderRadius: 5,
    elevation: 10,
    marginTop: 15,
  },
});
