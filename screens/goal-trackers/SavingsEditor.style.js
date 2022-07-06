import { Dimensions, Platform, StyleSheet } from "react-native";

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
    color: "darkorange",
    marginTop: 40,
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
    borderColor: "darkorange",
    alignSelf: "auto",
    backgroundColor: "transparent",
  },
  title: {
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: 20,
    color: "darkorange",
    fontWeight: "bold",
  },
  goalContainer: {
    flexDirection: "row",
    alignItems: "space-around",
    justifyContent: "space-around",
    marginTop: Platform.OS === "ios" ? 10 : 0,
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
    color: "darkorange"
  },
  remainingText: {
    fontSize: 14,
    fontWeight: "bold"
  },
  remainingNumber: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "darkorange"
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
    borderColor: "darkorange",
  },
  descriptionText: {
    fontSize: 16,
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
    backgroundColor: "darkorange",
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
