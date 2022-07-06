import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";
import { Bar } from "react-native-progress";

export default SavingList = ({
  saving,
  completeSaving,
  deleteSaving,
  navigation,
}) => {
  const route = useRoute();
  const savingText = saving.name;

  const calculateProgress = (saving) => {
    const curr = saving.curr_amount;
    const total = saving.amount;
    return curr / total;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.listContainer}
        onPress={() =>
          navigation.navigate("SavingsEditor", {
            routeName: route.name,
            saving: saving,
          })
        }
      >
        <TouchableOpacity
          style={styles.boxContainer}
          onPress={() => completeSaving(saving)}
        >
          <FontAwesome name="square-o" size={25} color={"black"} />
        </TouchableOpacity>
        <View style={styles.barContainer}>
          <Text style={styles.listText}>
            {savingText.substring(0, 16) +
              (savingText.length > 16 ? "..." : "")}
          </Text>
          <View>
            <Bar
              progress={calculateProgress(saving)}
              width={null}
              height={5}
              unfilledColor="#555555"
              color={"#ffd700"}
              borderWidth={0}
              animationConfig={{ bounciness: 50 }}
            />
            <View style={styles.progressText}>
              <Text style={styles.amountText}>${saving.curr_amount}</Text>
              <Text style={styles.goalText}>${saving.amount}</Text>
            </View>
          </View>
        </View>
        <View style={styles.iconContainer}>
          {/* <FontAwesome
            name="repeat"
            size={15}
            // color={exercise.recurring ? "white" : "transparent"}
              // color="transparent"
          /> */}
          <TouchableOpacity
            style={styles.trashContainer}
            onPress={() => deleteSaving(saving)}
          >
            <FontAwesome5 name="trash" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    height: "auto",
    width: "auto",
    marginTop: 25,
  },
  listContainer: {
    height: "auto",
    width: 350,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "darkgoldenrod",
  },
  boxContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 10,
    marginVertical: 17,
  },
  barContainer: {
    width: 270,
  },
  listText: {
    color: "white",
    fontSize: 20,
    marginBottom: 2,
  },
  progressText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  // trashContainer: {
  //   marginTop: 10,
  // },
  amountText: {
    color: "gold",
    fontSize: 14,
    marginVertical: 2,
  },
  goalText: {
    color: "white",
    fontSize: 14,
    marginVertical: 2,
  },
});
