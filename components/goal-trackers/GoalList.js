import React from "react";
import { Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import styles from "./GoalList.style";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";

export default GoalList = ({ item, deleteItem, completeItem, navigation }) => {
  const route = useRoute();

  const capitaliseFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <View style={styles.componentContainer}>
      <TouchableOpacity
        style={
          item.type == "General"
            ? styles.goalListContainer
            : item.type == "Academic"
            ? styles.academicListContainer
            : item.type == "Fitness"
            ? styles.fitnessListContainer
            : styles.financeListContainer
        }
        onPress={() =>
          navigation.navigate("GoalEditor", {
            routeName: route.name,
            item: item,
          })
        }
      >
        <TouchableOpacity
          style={styles.circleContainer}
          onPress={() => completeItem(item.key)}
        >
          <FontAwesome name="square-o" size={24} color={"black"} />
        </TouchableOpacity>
        <View>
          <Text style={styles.listText}>{item.value}</Text>
          <Text style={styles.listSubtext}>{capitaliseFirstLetter(item.type)}</Text>
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
