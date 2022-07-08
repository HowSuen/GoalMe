import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Platform, TouchableOpacity, View } from "react-native";
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
      <Card
        containerStyle={{
          padding: Platform.OS == "ios" ? 5 : 0,
          borderRadius: 10,
          backgroundColor: "mediumseagreen",
          elevation: 10,
          borderColor: "mediumseagreen",
          marginVertical: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("GoalsProgress")}
          style={styles.cardContainer}
        >
          <Image
            style={styles.cardIcon}
            source={require("../../assets/goals-progress.png")}
          />
          <Text style={styles.cardText}>Goals</Text>
        </TouchableOpacity>
      </Card>
      <Card
        containerStyle={{
          padding: Platform.OS == "ios" ? 5 : 0,
          borderRadius: 10,
          backgroundColor: "#27A4F2",
          elevation: 10,
          borderColor: "#27A4F2",
          marginVertical: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("ModulesProgress")}
          style={styles.cardContainer}
        >
          <Image
            style={styles.cardIcon}
            source={require("../../assets/modules-progress.png")}
          />
          <Text style={styles.cardText}>Modules</Text>
        </TouchableOpacity>
      </Card>
      <Card
        containerStyle={{
          padding: Platform.OS == "ios" ? 5 : 0,
          borderRadius: 10,
          backgroundColor: "plum",
          elevation: 10,
          borderColor: "plum",
          marginVertical: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("ExercisesProgress")}
          style={styles.cardContainer}
        >
          <Image
            style={styles.cardIcon}
            source={require("../../assets/exercises-progress.png")}
          />
          <Text style={styles.cardText}>Exercises</Text>
        </TouchableOpacity>
      </Card>
      <Card
        containerStyle={{
          padding: Platform.OS == "ios" ? 5 : 0,
          borderRadius: 10,
          backgroundColor: "rgb(255,176,58)",
          elevation: 10,
          borderColor: "rgb(255,176,58)",
          marginVertical: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("SavingsProgress")}
          style={styles.cardContainer}
        >
          <Image
            style={styles.cardIcon}
            source={require("../../assets/savings-progress.png")}
          />
          <Text style={styles.cardText}>Savings</Text>
        </TouchableOpacity>
      </Card>
    </View>
  );
};
