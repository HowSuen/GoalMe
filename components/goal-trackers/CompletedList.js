import React from "react";
import { Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import styles from "./GoalList.style";
import { TouchableOpacity } from "react-native-gesture-handler";

export default CompletedList = ({ item, deleteItem, uncompleteItem }) => {
  return (
    <View style={styles.componentContainer}>
      <View style={
        item.type == "general"
        ? styles.goalListContainer
        : item.type == "academic"
        ? styles.academicListContainer
        : item.type == "fitness"
        ? styles.fitnessListContainer
        : styles.financeListContainer
      }>
        <TouchableOpacity
          style={styles.checkContainer}
          onPress={() => uncompleteItem(item.key)}
        >
          <FontAwesome name="check" size={20} color="black" />
        </TouchableOpacity>
        <View>
          <Text style={styles.listText}>{item.value}</Text>
          <Text style={styles.listSubtext}>Completed</Text>
        </View>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => deleteItem(item.key)}
        >
          <FontAwesome name="trash" size={25} color="firebrick" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
