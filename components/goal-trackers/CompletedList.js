import React from "react";
import { Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import styles from "./GoalList.style";
import { TouchableOpacity } from "react-native-gesture-handler";

export default CompletedList = ({ item, deleteItem, uncompleteItem }) => {
  return (
    <View style={styles.componentContainer}>
      <View style={
        item.type == "General"
        ? styles.goalListContainer
        : item.type == "Academic"
        ? styles.academicListContainer
        : item.type == "Fitness"
        ? styles.fitnessListContainer
        : styles.financeListContainer
      }>
        <TouchableOpacity
          style={styles.checkContainer}
          onPress={() => uncompleteItem(item.key)}
        >
          <FontAwesome name="check-square-o" size={20} color="black" />
        </TouchableOpacity>
        <View>
          <Text style={styles.listText}>{item.value}</Text>
          <Text style={styles.listSubtext}>Completed</Text>
        </View>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => deleteItem(item.key)}
        >
          <FontAwesome name="trash" size={25} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
