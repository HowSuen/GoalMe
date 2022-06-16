import React from "react";
import { Text, View } from "react-native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import styles from "./GoalList.style";
import { TouchableOpacity } from "react-native-gesture-handler";

export default CompletedList = ({ goal, redoGoal, deleteGoal }) => {
  return (
    <View style={styles.container}>
      <View
        style={
          goal.type == "General"
            ? styles.goalListContainer
            : goal.type == "Academic"
            ? styles.academicListContainer
            : goal.type == "Fitness"
            ? styles.fitnessListContainer
            : styles.financeListContainer
        }
      >
        <TouchableOpacity
          style={styles.checkContainer}
          onPress={() => redoGoal(goal)}
        >
          <FontAwesome name="check-square-o" size={25} color="black" />
        </TouchableOpacity>
        <View>
          <Text style={styles.listText}>
            {goal.content.substring(0, 19) +
              (goal.content.length > 19 ? "..." : "")}
          </Text>
          <Text style={styles.listSubtext}>{goal.difficulty}</Text>
        </View>
        <View style={styles.iconContainer}>
          <FontAwesome
            name="repeat"
            size={15}
            color={goal.recurring ? "white" : "transparent"}
          />
          <TouchableOpacity
            style={styles.trashContainer}
            onPress={() => deleteGoal(goal)}
          >
            <FontAwesome5 name="trash" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
