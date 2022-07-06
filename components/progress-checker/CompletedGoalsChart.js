import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { VictoryLabel, VictoryPie, VictoryTheme } from "victory-native";
import supabase from "../../lib/supabase";
import { Text } from "react-native-elements";
import Svg from "react-native-svg";

export default CompletedGoalsChart = () => {
  const user = supabase.auth.user();
  const isFocused = useIsFocused();

  const [completedGen, setCompletedGen] = useState(0);
  const [completedAcad, setCompletedAcad] = useState(0);
  const [completedFit, setCompletedFit] = useState(0);
  const [completedFinance, setCompletedFinance] = useState(0);
  const [completedTotal, setCompletedTotal] = useState(0);

  const data = [
    { x: "General", y: completedGen, fill: "mediumseagreen" },
    { x: "Academic", y: completedAcad, fill: "royalblue" },
    { x: "Fitness", y: completedFit, fill: "tomato" },
    { x: "Finance", y: completedFinance, fill: "goldenrod" },
  ];

  useEffect(() => {
    getData();
  }, [
    isFocused,
    completedGen,
    completedAcad,
    completedFit,
    completedFinance,
    completedTotal,
  ]);

  const getData = async () => {
    try {
      if (!user) throw new Error("No user on the session!");

      let { data, error, status } = await supabase
        .from("experience")
        .select("completed, completedAcad, completedFit, completedFinance")
        .match({ id: user.id })
        .single();

      if (error && status !== 406) {
        throw error;
      }

      Object.entries(data).forEach(([key, value] = entry) => {
        if (key == "completed") {
          setCompletedTotal(value);
        } else if (key == "completedAcad") {
          setCompletedAcad(value);
        } else if (key == "completedFit") {
          setCompletedFit(value);
        } else if (key == "completedFinance") {
          setCompletedFinance(value);
        }
      });
      setCompletedGen(
        completedTotal - completedAcad - completedFit - completedFinance
      );
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Number of Goals Completed</Text>
      <Svg width={400} height={400}>
        <VictoryLabel
          x={200}
          y={200}
          style={{ fontSize: 20 }}
          textAnchor={"middle"}
          text={"Total: " + completedTotal}
        />
        <VictoryPie
          theme={VictoryTheme.material}
          animate={{
            duration: 500,
          }}
          width={400}
          height={400}
          innerRadius={({ radius }) => radius / 2}
          labelPlacement="vertical"
          labelPosition="centroid"
          labelRadius={({ radius }) => (11 / 16) * radius}
          labels={({ datum }) => Math.floor(datum.y)}
          style={{
            data: {
              fill: ({ datum }) => datum.fill,
              strokeWidth: 0,
            },
            labels: {
              fontSize: 20,
              fill: "black",
            },
          }}
          categories={{
            x: ["General", "Academic", "Fitness", "Finance"],
          }}
          data={data}
          standalone={false}
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: -30,
  },
  text: {
    fontSize: 20,
    color: "black",
    marginTop: 10,
    marginBottom: -30,
  },
});
