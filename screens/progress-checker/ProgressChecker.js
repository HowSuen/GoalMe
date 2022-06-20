import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";
import supabase from "../../lib/supabase";

export default ProgressChecker = () => {
  const user = supabase.auth.user();
  const isFocused = useIsFocused();
  const [experience, setExperience] = useState(null);

  useEffect(() => {
    getExperience().then((exp) => setExperience(exp));
  }, [isFocused]);

  const getExperience = async () => {
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

      let exp = [];
      Object.entries(data).forEach(([key, value] = entry) => {
        exp.push({ thing: key, number: value });
      });
      
      return exp;
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      {experience && (
        <VictoryChart width={400} theme={VictoryTheme.material}>
          <VictoryBar data={experience} x="thing" y="number" />
        </VictoryChart>
      )}
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
