import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Card, Text, Image } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import styles from "./ProgressChecker.style";

export default ProgressChecker = ({ navigation }) => {
  const isFocused = useIsFocused();

  const [state, setState] = useState({});

  useEffect(() => {
    return () => {
      setState({});
    };
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("GoalsProgress")}>
        <Card containerStyle={{ padding: 5 }}>
          <View style={styles.cardContainer}>
            <Image
              style={styles.cardIcon}
              source={require("../../assets/goals-progress.png")}
            />
            <Text style={styles.cardText}>Goals</Text>
          </View>
        </Card>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("ModulesProgress")}>
        <Card containerStyle={{ padding: 5 }}>
          <View style={styles.cardContainer}>
            <Image
              style={styles.cardIcon}
              source={require("../../assets/modules-progress.png")}
            />
            <Text style={styles.cardText}>Modules</Text>
          </View>
        </Card>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("ExercisesProgress")}
      >
        <Card containerStyle={{ padding: 5 }}>
          <View style={styles.cardContainer}>
            <Image
              style={styles.cardIcon}
              source={require("../../assets/exercises-progress.png")}
            />
            <Text style={styles.cardText}>Exercises</Text>
          </View>
        </Card>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("SavingsProgress")}>
        <Card containerStyle={{ padding: 5 }}>
          <View style={styles.cardContainer}>
            <Image
              style={styles.cardIcon}
              source={require("../../assets/savings-progress.png")}
            />
            <Text style={styles.cardText}>Savings</Text>
          </View>
        </Card>
      </TouchableOpacity>
    </View>
  );
};
