import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";
import supabase from "../../lib/supabase";

export default ProgressChecker = () => {
  const user = supabase.auth.user();
  const isFocused = useIsFocused();
  //   const [dataIsFinished, setDataIsFinished] = useState(false);
  //   const experience = [{ thing: "me", number: 1 }];

  useEffect(() => {
    // getExperience().then(() => console.log("hi"));
  }, [isFocused]);

  const getExperience = async () => {
    // setDataIsFinished(false);
    // let promise;

    try {
      if (!user) throw new Error("No user on the session!");

      let { data, error, status } = await supabase
        .from("experience")
        .select("*")
        .match({ id: user.id })
        .single();

      if (error && status !== 406) {
        throw error;
      }

      let experience = [];
      Object.entries(data).forEach(([key, value] = entry) => {
        experience.push({ thing: key, number: value });
      });
      return experience;
      //   promise = data;
    } catch (error) {
      Alert.alert(error.message);
    }
    // setDataIsFinished(true);
    // return promise;
  };

  const experience = getExperience();
  
  return (
    <View style={styles.container}>
      <VictoryChart width={350} theme={VictoryTheme.material}>
        <VictoryBar data={experience} x="thing" y="number" />
      </VictoryChart>
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
