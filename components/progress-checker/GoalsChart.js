import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { VictoryLabel, VictoryPie, VictoryTheme } from "victory-native";
import supabase from "../../lib/supabase";
import { Text } from "react-native-elements";
import Svg from "react-native-svg";

export default GoalsChart = () => {
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

      if (!data) return;

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
      <Text style={styles.text}>Number of Goals Achieved</Text>
      {/* <Svg width={400} height={400}> */}
      {/* <VictoryLabel
          x={200}
          y={200}
          style={{ fontSize: 18 }}
          textAnchor={"middle"}
          text={"Total: " + completedTotal}
        /> */}
      <VictoryPie
        theme={VictoryTheme.material}
        animate={{
          duration: 500,
        }}
        width={350}
        height={350}
        innerRadius={({ radius }) => radius / 2}
        labelPlacement="vertical"
        labelPosition="centroid"
        labels={({ datum }) =>
          !datum.y || datum.y == 0 ? null : Math.floor(datum.y)
        }
        labelRadius={({ radius }) => (11 / 16) * radius}
        style={{
          data: {
            fill: ({ datum }) => datum.fill,
            strokeWidth: 0,
          },
          labels: {
            fontSize: 18,
            fontWeight: "bold",
            fill: "black",
          },
        }}
        categories={{
          x: ["General", "Academic", "Fitness", "Finance"],
        }}
        data={
          data
          // data.filter((obj) => obj.y != 0).length == 0
          //   ? data
          //   : data.filter((obj) => obj.y != 0)
        }
        events={[
          {
            target: "data",
            eventHandlers: {
              onPressIn: () => {
                return [
                  {
                    target: "labels",
                    mutation: ({ datum, text }) => {
                      return text == datum.y
                        ? {
                            text: datum.x,
                            // style: { fontSize: 14 },
                          }
                        : {
                            text: datum.y,
                            // style: { fontSize: 18 },
                          };
                    },
                  },
                ];
              },
            },
          },
        ]}
      />
      {/* </Svg> */}
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
    fontWeight: "bold",
    color: "black",
    marginTop: 10,
    marginBottom: -30,
  },
});
