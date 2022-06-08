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
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    width: 300,
    marginRight: 20,
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
  },
  goalSubmitButton: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "mediumseagreen",
    marginBottom: 20,
    borderRadius: 100,
  },
  academicSubmitButton: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "royalblue",
    marginBottom: 20,
    borderRadius: 100,
  },
  fitnessSubmitButton: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "tomato",
    marginBottom: 20,
    borderRadius: 100,
  },
  financeSubmitButton: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "goldenrod",
    marginBottom: 20,
    borderRadius: 100,
  },
});
