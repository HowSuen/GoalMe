import { Dimensions, StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
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
  walletContainer: {
    alignItems: "center",
    borderColor: "black",
    borderBottomWidth: 1,
    // width: 350,
  },
  walletImage: {
    width: 250,
    height: 250,
  },
  walletButton: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "darkgoldenrod",
    marginVertical: 5,
    borderRadius: 100,
  },
  walletNavButton: {
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "darkgoldenrod",
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
    marginTop: 50,
    width: 350,
  },
  emptyImage: {
    width: 80,
    height: 80,
  },
  emptyText: {
    color: "black",
    marginTop: 10,
    fontSize: 18,
  },
});
