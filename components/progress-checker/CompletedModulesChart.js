import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
} from "victory-native";
import supabase from "../../lib/supabase";
import { Text } from "react-native-elements";

const grades = [
  { label: "A+", value: "A+" },
  { label: "A", value: "A" },
  { label: "A-", value: "A-" },
  { label: "B+", value: "B+" },
  { label: "B", value: "B" },
  { label: "B-", value: "B-" },
  { label: "C+", value: "C+" },
  { label: "C", value: "C" },
  { label: "C-", value: "C-" },
  { label: "D+", value: "D+" },
  { label: "D", value: "D" },
  { label: "F", value: "F" },
  { label: "F*", value: "F*" },
  // { label: "S", value: "S" },
  // { label: "U", value: "U" },
];

export default CompletedModulesChart = () => {
  const user = supabase.auth.user();
  const isFocused = useIsFocused();

  const [completedMods, setCompletedMods] = useState([
    { x: "F*", y: 0 },
    { x: "F", y: 0 },
    { x: "D", y: 0 },
    { x: "D+", y: 0 },
    { x: "C-", y: 0 },
    { x: "C", y: 0 },
    { x: "C+", y: 0 },
    { x: "B-", y: 0 },
    { x: "B", y: 0 },
    { x: "B+", y: 0 },
    { x: "A-", y: 0 },
    { x: "A", y: 0 },
    { x: "A+", y: 0 },
  ]);

  const defaultData = [
    { x: "F*", y: 0 },
    { x: "F", y: 0 },
    { x: "D", y: 0 },
    { x: "D+", y: 0 },
    { x: "C-", y: 0 },
    { x: "C", y: 0 },
    { x: "C+", y: 0 },
    { x: "B-", y: 0 },
    { x: "B", y: 0 },
    { x: "B+", y: 0 },
    { x: "A-", y: 0 },
    { x: "A", y: 0 },
    { x: "A+", y: 0 },
  ];

  useEffect(() => {
    getData();
  }, [isFocused, completedMods]);

  const getData = async () => {
    let mods = [...defaultData];

    try {
      if (!user) throw new Error("No user on the session!");

      let { data, error, status } = await supabase
        .from("modules")
        .select("module_code, module_name, grade_received")
        .match({ user_id: user.id, completion_status: true });

      if (error && status !== 406) {
        throw error;
      }

      for (let obj of data) {
        for (let mod of mods) {
          if (obj.grade_received == mod.x) {
            mod.y++;
          }
        }
      }

      let stateChanged = false;
      for (let i = 0; i < mods.length; i++) {
        if (mods[i].y != completedMods[i].y) {
          stateChanged = true;
          break;
        }
      }
      if (stateChanged) setCompletedMods(mods);
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Grades</Text>
      <VictoryChart
        height={300}
        width={400}
        theme={VictoryTheme.material}
        animate={{
          duration: 500,
        }}
        domainPadding={50}
      >
        <VictoryAxis
          dependentAxis={true}
          tickFormat={(y) => {
            if (y == Math.floor(y)) {
              return y;
            }
          }}
          label="Number of Modules"
          style={{ axisLabel: { padding: 25 } }}
        />
        <VictoryAxis
          label="Grades Received"
          style={{ axisLabel: { padding: 30 } }}
        />
        <VictoryBar
          style={{ data: { fill: "#27A4F2" } }}
          animate={{
            duration: 500,
          }}
          labels={({ datum }) => Math.floor(datum.y)}
          data={completedMods.filter((obj) => obj.y != 0)}
        />
      </VictoryChart>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 5,
  },
  text: {
    fontSize: 18,
    color: "black",
    marginTop: 10,
    marginBottom: -30,
  },
});
