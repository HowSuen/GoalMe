import React from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { Card } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";

const Achievement = ({ item }) => {
  const uncompletedAchievement = () => {
    return (
      <View>
        <Card containerStyle={{ backgroundColor: "rgba(245,242,234,1.0)", marginVertical: 0 }}>
          <View style={styles.card}>
            <View>
              <Text style={styles.title}>{item.name}</Text>
              <Text>{item.description}</Text>
            </View>
            <AntDesign name="staro" size={25} color={"black"} />
          </View>
        </Card>
      </View>
    );
  };

  const completedAchievement = () => {
    return (
        <View>
          <Card containerStyle={{ backgroundColor: "rgba(235,227,216,1.0)", marginVertical: 0 }}>
            <View style={styles.card}>
              <View>
                <Text style={styles.title}>{item.name}</Text>
                <Text>{item.description}</Text>
              </View>
              <AntDesign name="star" size={25} color={"goldenrod"} />
            </View>
          </Card>
        </View>
      );
  }

  return (item.completed ? completedAchievement() : uncompletedAchievement());
};

export default Achievement;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: (Dimensions.get("window").width / 10) * 8.5,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
