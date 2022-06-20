import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import {
  VictoryBar,
  VictoryChart,
  VictoryPie,
  VictoryTheme,
} from "victory-native";
import supabase from "../../lib/supabase";
import { Text } from "react-native-elements";

export default ProgressChecker = () => {
  const user = supabase.auth.user();
  const isFocused = useIsFocused();
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(false);

  const [completed, setCompleted] = useState(0);
  const [completedAcad, setCompletedAcad] = useState(0);
  const [completedFit, setCompletedFit] = useState(0);
  const [completedFinance, setCompletedFinance] = useState(0);

  useEffect(() => {
    // getExperience().then((exp) => setExperience(exp));
  }, [isFocused]);

  const getExperience = async () => {
    setLoading(true);
    let exp = [];
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
        exp.push({ thing: key, number: value });
      });
    } catch (error) {
      Alert.alert(error.message);
    }
    setLoading(false);
    return exp;
  };

  // const getExperience = async () => {
  //   try {
  //     if (!user) throw new Error("No user on the session!");

  //     let { data, error, status } = await supabase
  //       .from("experience")
  //       .select("completed, completedAcad, completedFit, completedFinance")
  //       .match({ id: user.id })
  //       .single();

  //     if (error && status !== 406) {
  //       throw error;
  //     }

  //     let exp = [];
  //     Object.entries(data).forEach(([key, value] = entry) => {
  //       exp.push({ thing: key, number: value });
  //     });
      
  //     return exp;
  //     // let exp = [];
  //     // Object.entries(data).forEach(([key, value] = entry) => {
  //     //   exp.push({ thing: key, number: value });
  //     // });

  //     // return exp;

  //     if (data) {
  //       setCompleted(data.completed);
  //       setCompletedAcad(data.completedAcad);
  //       setCompletedFit(data.completedFit);
  //       setCompletedFinance(data.completedFinance);

  //       const exp = [
  //         { thing: "Total", number: data.completed },
  //         { thing: "Academic", number: data.completedAcad },
  //         { thing: "Fitness", number: data.completedFit },
  //         { thing: "Finance", number: data.completedFinance },
  //       ];

  //       setExperience(exp);
  //     }
  //   } catch (error) {
  //     Alert.alert(error.message);
  //   }
  //   // return true;
  // };

  const data = [
    { x: "General", y: 4 },
    { x: "Academic", y: 7 },
    { x: "Fitness", y: 5 },
    { x: "Finance", y: 6 },
  ];

  return (
    <View style={styles.container}>
      {!loading && (
        <VictoryPie
          data={data}
          colorScale={["mediumseagreen", "royalblue", "tomato", "goldenrod"]}
          labelPlacement={"perpendicular"}
          labelPosition={"centroid"}
          width={400}
          theme={VictoryTheme.material}
        />
      )}
      <Text style={{ fontSize: 20 }}>Sample</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff",
  },
});
