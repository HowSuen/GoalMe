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
  moduleText: {
    fontSize: 18,
    color: "black",
    paddingHorizontal: 10,
    paddingBottom: 20,
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
  dropdownContainer: {
    paddingBottom: 20,
    paddingTop: 2,
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
    width: 160,
    borderRadius: 5,
    elevation: 10,
  },
  disabledButton: {
    backgroundColor: "gray",
    padding: 10,
    width: 150,
    borderRadius: 5,
    elevation: 10,
  },
});
