import React from "react";
import { Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import styles from "./GoalList.style";
import { TouchableOpacity } from "react-native-gesture-handler";

const FitnessList = ({ item, deleteItem, completeItem }) => {
  return (
    <View style={styles.componentContainer}>
      <View style={styles.listContainer}>
        <TouchableOpacity
          style={styles.circleContainer}
          onPress={() => completeItem(item.key)}
        >
          <FontAwesome name="circle-o" size={20} color="tomato" />
        </TouchableOpacity>
        <View>
          <Text style={styles.listText}>{item.value}</Text>
          <Text style={styles.listSubtext}>Fitness</Text>
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

export default FitnessList;
