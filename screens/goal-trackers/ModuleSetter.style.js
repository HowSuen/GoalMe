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
  instructionContainer: {
    paddingHorizontal: 10,
    alignSelf: "stretch",
    paddingBottom: 10,
  },
  instructionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "gray",
  },
  instructionText: {
    fontSize: 16,
    paddingTop: 5,
    paddingBottom: 10,
    lineHeight: 25,
    color: "black",
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
    marginTop: 8,
    marginBottom: 20,
  },
  disabledButton: {
    backgroundColor: "gray",
    padding: 10,
    width: 90,
    borderRadius: 5,
    elevation: 10,
    marginTop: 8,
    marginBottom: 20,
  },
});
