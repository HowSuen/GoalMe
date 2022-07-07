import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { Card, Image } from "react-native-elements";

export default TitleCard = ({ type }) => {
  return (
    <Card
      containerStyle={{
        padding: 5,
        paddingRight: 10,
        marginTop: 0,
      }}
    >
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={
            type == "Goals"
              ? require("../../assets/goals-progress.png")
              : type == "Modules"
              ? require("../../assets/modules-progress.png")
              : type == "Exercises"
              ? require("../../assets/exercises-progress.png")
              : require("../../assets/savings-progress.png")
          }
        />
        <View style={styles.rightContainer}>
          <Text style={styles.text}>{type} Overview</Text>
        </View>
      </View>
    </Card>
  );
};

const width = (Dimensions.get("window").width / 10) * 9;

const styles = StyleSheet.create({
  container: {
    width: width,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    width: Platform.OS === "ios" ? 100 : 50,
    height: Platform.OS === "ios" ? 100 : 50,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  rightContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
    alignSelf: "center"
  },
});
