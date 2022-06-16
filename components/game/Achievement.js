import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";

export default Achievement = ({}) => {
  const route = useRoute();

  return (
    <View style={styles.container}>
      <TouchableOpacity></TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});
