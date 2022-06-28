import { Dimensions, StyleSheet } from "react-native";

export default StyleSheet.create({
  scrollview: {
    flex: 1,
    backgroundColor: "ghostwhite"
  },
  container: {
    padding: 15,
    justifyContent: "center",
    backgroundColor: "ghostwhite",
    paddingBottom: 5,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  formContainer: {
    marginVertical: 20,
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
    width: (Dimensions.get("window").width / 10) * 5,
    borderRadius: 5,
    elevation: 5,
  },
  disabledButton: {
    backgroundColor: "gray",
    padding: 10,
    width: (Dimensions.get("window").width / 10) * 5,
    borderRadius: 5,
    elevation: 5,
  },
  exercise: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  inputCOntainerSmall: {
    width: (Dimensions.get("window").width / 10) * 2.5,
    alignItems: "center",
  },
  timerButton: {
    width: (Dimensions.get("window").width / 10) * 2,
    backgroundColor: "white",
    height: 50,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray"
  },
  timerText: {
    fontSize: 20,
    color: "black",
  },
  colon: {
    justifyContent: "center",
    alignItems: "center"
  },
  timerContainer: {
    flexDirection: "row",
  },
  defaultContainer: {
    marginVertical: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  defaultText: {
    fontSize: 20,
    color: "black",
    marginVertical: 20,
  }
});
