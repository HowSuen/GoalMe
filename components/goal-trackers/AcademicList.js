import React from "react";
import { Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import styles from "./GoalList.style";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function AcademicList({ item, deleteItem }) {
  return (
    <View style={styles.componentContainer}>
      <TouchableOpacity style={styles.listContainer}>
        <View style={styles.circleContainer}>
          <FontAwesome name="circle-o" size={20} color="darkslateblue" />
        </View>
        <View>
          <Text style={styles.listText}>{item.value}</Text>
          <Text style={styles.listSubtext}>Academic</Text>
        </View>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => deleteItem(item.key)}
        >
          <FontAwesome name="trash-o" size={27} color="darkred" />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
}
