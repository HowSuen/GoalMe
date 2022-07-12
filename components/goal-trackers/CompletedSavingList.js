import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";
import { Bar } from "react-native-progress";

export default CompletedSavingList = ({ saving, redoSaving, deleteSaving }) => {
  const savingText = saving.name;

  const calculateProgress = (saving) => {
    const curr = parseFloat(saving.curr_amount.replace(",", ""), 10);
    const total = parseFloat(saving.amount.replace(",", ""), 10);
    if (curr >= total) {
      return 1;
    } else if (curr <= 0) {
      return 0;
    } else {
      return curr / total;
    }
  };

  const isNegative = (amt) => {
    return parseFloat(amt.replace(",", ""), 10) < 0;
  };

  const calculateAbsolute = (number) => {
    const num = parseFloat(number.replace(",", ""), 10);
    const abs = Math.abs(num);
    return abs.toString();
  };

  const currencyFormat = (str) => {
    const num = parseFloat(str.replace(",", ""), 10);
    return "$" + num.toPrecision().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <TouchableOpacity
          style={styles.boxContainer}
          onPress={() => redoSaving(saving)}
        >
          <FontAwesome name="check-square-o" size={25} color={"black"} />
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
              unfilledColor="#FFF0A5"
              color={"rgb(91,130,75)"}
              borderWidth={0}
              animationConfig={{ bounciness: 50 }}
            />
            <View style={styles.progressText}>
              <Text
                style={styles.fullAmountText}
              >
                {isNegative(saving.curr_amount) ? "-" : ""}
                {currencyFormat(calculateAbsolute(saving.curr_amount))}
              </Text>
              <Text style={styles.goalText}>
                {currencyFormat(saving.amount)}
              </Text>
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
            <Ionicons name="trash" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    height: "auto",
    width: "auto",
    marginTop: 15,
  },
  listContainer: {
    height: "auto",
    width: 350,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgb(255,176,58)",
  },
  boxContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 10,
    marginVertical: 20,
  },
  barContainer: {
    width: 270,
  },
  listText: {
    color: "#40343B",
    fontSize: 20,
    marginVertical: 5,
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
    color: "rgb(182,74,38)",
    fontSize: 14,
    marginVertical: 2,
  },
  fullAmountText: {
    color: "rgb(91,130,75)",
    fontSize: 14,
    marginVertical: 2,
  },
  goalText: {
    color: "#40343B",
    fontSize: 14,
    marginVertical: 2,
  },
});
