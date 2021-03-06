import { Dimensions, StyleSheet } from "react-native";

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
  listContainer: {
    flex: 1.3,
    backgroundColor: "white",
    borderWidth: 0.8,
    borderColor: "lightgray",
    borderRadius: 5,
    margin: 10,
  },
  walletContainer: {
    flex: 0.5,
    alignItems: "center",
    borderWidth: 0.8,
    borderColor: "lightgray",
    borderRadius: 5,
    paddingTop: 20,
    margin: 10,
    marginBottom: 0,
    backgroundColor: "white"
  },
  walletImage: {
    width: 100,
    height: 100,
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
    borderRadius: 10,
    marginTop: 25,
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
