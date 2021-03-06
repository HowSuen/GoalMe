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
];

export default ModulesChart = () => {
  const user = supabase.auth.user();
  const isFocused = useIsFocused();

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

  const defaultDisplayData = [
    { x: "B-", y: 0 },
    { x: "B", y: 0 },
    { x: "B+", y: 0 },
    { x: "A-", y: 0 },
    { x: "A", y: 0 },
    { x: "A+", y: 0 },
  ];

  const [completedMods, setCompletedMods] = useState([...defaultData]);

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

      if (!data) return;

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
        height={350}
        width={350}
        theme={VictoryTheme.material}
        animate={{
          duration: 100,
        }}
      >
        <VictoryAxis
          dependentAxis={true}
          tickFormat={(y) => {
            if (y == Math.floor(y)) {
              return y;
            }
          }}
          label="Number of Modules"
          style={{ axisLabel: { padding: 30, fontWeight: "bold" } }}
        />
        <VictoryAxis
          label="Grades Received"
          style={{ axisLabel: { padding: 30, fontWeight: "bold" } }}
          domainPadding={20}
        />
        <VictoryBar
          style={{ data: { fill: "#27A4F2" } }}
          animate={{
            duration: 100,
          }}
          labels={({ datum }) => (datum.y == 0 ? null : Math.floor(datum.y))}
          data={
            (() => {
              const data = completedMods.filter(
                (obj) =>
                  defaultDisplayData.map((o) => o.x).includes(obj.x) ||
                  obj.y != 0
              );
              return data.length == 0 ? defaultDisplayData : data;
            })()
          }
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
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginTop: 10,
    marginBottom: -20,
  },
});
