import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "ghostwhite",
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  goalButton: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    backgroundColor: "mediumseagreen",
    marginVertical: 5,
    borderRadius: 100,
  },
  deleteButton: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "mediumaquamarine",
    marginVertical: 5,
    borderRadius: 100,
  },
  academicButton: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "royalblue",
    marginVertical: 5,
    borderRadius: 100,
  },
  fitnessButton: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "tomato",
    marginVertical: 5,
    borderRadius: 100,
  },
  financeButton: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "goldenrod",
    marginVertical: 5,
    borderRadius: 100,
  },
  moduleButton: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#27A4F2",
    marginVertical: 5,
    borderRadius: 100,
  },
  moduleNavButton: {
    // alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#27A4F2",
    borderRadius: 5,
    marginTop: 15,
    width: 100,
  },
  exerciseButton: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "plum",
    marginVertical: 5,
    borderRadius: 100,
  },
  exerciseNavButton: {
    // alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "plum",
    borderRadius: 5,
    marginTop: 15,
    width: 100,
  },
  walletButton: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "rgb(255,176,58)",
    marginVertical: 5,
    borderRadius: 100,
  },
  walletNavButton: {
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(255,176,58)",
    borderRadius: 5,
    marginTop: 15,
    width: 100,
  },
  buttonText: {
    fontSize: 18,
    padding: 10,
    color: "black",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 150,
    width: 350,
  },
  emptyImage: {
    width: 200,
    height: 200,
  },
  emptyText: {
    color: "black",
    marginTop: 20,
    fontSize: 28,
  },
});
