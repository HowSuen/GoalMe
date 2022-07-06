import { Dimensions, StyleSheet } from "react-native";

export default StyleSheet.create({
  scrollview: {
    flex: 1,
    backgroundColor: "ghostwhite",
  },
  container: {
    justifyContent: "center",
    backgroundColor: "ghostwhite",
  },
  progressContainer: {
    marginTop: 10,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  circleContainer: {
    position: "absolute",
    alignItems: "center",
    width: 300,
  },
  circlePercentage: {
    fontSize: 80,
    color: "darkgoldenrod",
  },
  editIcon: {
    position: "absolute",
    right: 0,
    top: 0,
  },
  titleContainer: {
    marginTop: 5,
    paddingHorizontal: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "darkgoldenrod",
    alignSelf: "auto",
    backgroundColor: "transparent",
  },
  title: {
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: 20,
    color: "darkgoldenrod",
    fontWeight: "bold",
  },
  goalContainer: {
    flexDirection: "row",
    alignItems: "space-around",
    justifyContent: "space-around",
  },
  savedContainer: {
    alignItems: "center",
    padding: 5,
    width: 150,
  },
  savedText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  savedNumber: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    color: "darkgoldenrod"
  },
  remainingText: {
    fontSize: 14,
    fontWeight: "bold"
  },
  remainingNumber: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "darkgoldenrod"
  },
  remainingContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
    padding: 10,
  },
  dropdownLabel: {
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 10,
    color: "lightslategrey",
  },
  descriptionContainer: {
    padding: 3,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "darkgoldenrod",
  },
  descriptionText: {
    fontSize: 16,
  },
  inputContainer: {
    marginTop: 8,
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "darkgoldenrod",
    alignSelf: "stretch",
    backgroundColor: "transparent",
  },
  test: {
    width: 100,
    alignSelf: "center"
  },
  textInput: {
    color: "black",
  },
  buttonContainer: {
    alignItems: "center",
    paddingTop: 5,
    paddingBottom: 7,
  },
  buttonText: {
    color: "white",
    fontSize: 17,
    textAlign: "center",
  },
  button: {
    backgroundColor: "darkgoldenrod",
    padding: 10,
    width: 150,
    borderRadius: 5,
    elevation: 3,
  },
  disabledButton: {
    backgroundColor: "gray",
    padding: 10,
    width: 150,
    borderRadius: 5,
    elevation: 3,
  },
});
