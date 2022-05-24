import { StyleSheet } from "react-native";

export default StyleSheet.create({
  componentContainer: {
    flexDirection: "row",
  },
  inputContainer: {
    flexDirection: "row",
    borderRadius: 10,
  },
  input: {
    fontSize: 18,
    backgroundColor: "mintcream",
    width: 300,
    marginRight: 20,
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
  },
  submitButton: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "mediumspringgreen",
    marginBottom: 20,
    borderRadius: 100,
  },
});
