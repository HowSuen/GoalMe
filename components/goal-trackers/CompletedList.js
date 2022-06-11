import React from "react";
import { Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import styles from "./GoalList.style";
import { TouchableOpacity } from "react-native-gesture-handler";

export default CompletedList = ({ goal, uncompleteGoal, deleteGoal }) => {
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
          onPress={() => uncompleteGoal(goal.key)}
        >
          <FontAwesome name="check-square-o" size={25} color="black" />
        </TouchableOpacity>
        <View>
          <Text style={styles.listText}>{goal.content}</Text>
          <Text style={styles.listSubtext}>{goal.difficulty}</Text>
        </View>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => deleteGoal(goal.key)}
        >
          <FontAwesome name="trash" size={25} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
