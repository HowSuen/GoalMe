import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { VictoryPie, VictoryTheme } from "victory-native";
import supabase from "../../lib/supabase";
import { Text } from "react-native-elements";

export default CompletedChart = () => {
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
    // <VictoryChart
    //   height={300}
    //   style={{
    //     parent: {
    //       justifyContent: "stretch",
    //     },
    //   }}
    //   theme={VictoryTheme.material}
    //   animate={{
    //     duration: 500,
    //   }}
    //   // domain={{y: [0, 20]}}
    //   domainPadding={20}
    //   // padding={60}
    // >
    <View style={styles.container}>
      <Text style={styles.text}>Number of Goals Completed</Text>
      <VictoryPie
        theme={VictoryTheme.material}
        animate={{
          duration: 500,
        }}
        labelPlacement="vertical"
        labelPosition="centroid"
        labelRadius={({ radius }) => radius - 30}
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
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "ghostwhite",
    marginVertical: 20,
  },
  text: {
    fontSize: 20,
    color: "black",
    marginBottom: -20,
  },
});
