import React from "react";
import { Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import styles from "./GoalList.style";
import { TouchableOpacity } from "react-native-gesture-handler";

export default GoalList = ({ item, deleteItem, completeItem, navigation }) => {
  return (
    <View style={styles.componentContainer}>
      <TouchableOpacity
        style={
          item.type == "general"
            ? styles.goalListContainer
            : item.type == "academic"
            ? styles.academicListContainer
            : item.type == "fitness"
            ? styles.fitnessListContainer
            : styles.financeListContainer
        }
        onPress={() => navigation.navigate("GoalDetails", { item: item })}
      >
        <TouchableOpacity
          style={styles.circleContainer}
          onPress={() => completeItem(item.key)}
        >
          <FontAwesome name="square-o" size={24} color={"black"} />
        </TouchableOpacity>
        <View>
          <Text style={styles.listText}>{item.value}</Text>
          <Text style={styles.listSubtext}>{item.type}</Text>
        </View>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => deleteItem(item.key)}
        >
          <FontAwesome name="trash" size={25} color="black" />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};
