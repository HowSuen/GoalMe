import React from "react";
import { Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import styles from "./CompletedList.style";
import { TouchableOpacity } from "react-native-gesture-handler";

export default CompletedList = ({ item, deleteItem, uncompleteItem }) => {
  return (
    <View style={styles.componentContainer}>
      <View style={styles.listContainer}>
        <TouchableOpacity
          style={styles.checkContainer}
          onPress={() => uncompleteItem(item.key)}
        >
          <FontAwesome name="check" size={20} color="aquamarine" />
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
