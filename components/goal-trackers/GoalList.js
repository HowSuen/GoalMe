import React from "react";
import { Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import styles from "./GoalList.style";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";

export default GoalList = ({ goal, completeGoal, deleteGoal, navigation }) => {
  const route = useRoute();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={
          goal.type == "General"
            ? styles.goalListContainer
            : goal.type == "Academic"
            ? styles.academicListContainer
            : goal.type == "Fitness"
            ? styles.fitnessListContainer
            : styles.financeListContainer
        }
        onPress={() =>
          navigation.navigate("GoalEditor", {
            routeName: route.name,
            goal: goal,
          })
        }
      >
        <TouchableOpacity
          style={styles.circleContainer}
          onPress={() => completeGoal(goal.key)}
        >
          <FontAwesome name="square-o" size={25} color={"black"} />
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
      </TouchableOpacity>
    </View>
  );
};
