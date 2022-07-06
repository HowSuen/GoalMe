import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, View, TouchableOpacity } from "react-native";
import {
  VictoryBar,
  VictoryChart,
  VictoryPie,
  VictoryTheme,
} from "victory-native";
import supabase from "../../lib/supabase";
import { Text } from "react-native-elements";
import { Button } from "react-native-elements";
import CompletedChart from "../../components/progress-checker/CompletedChart";

export default ProgressChecker = () => {
  const user = supabase.auth.user();
  const isFocused = useIsFocused();

  const [state, setState] = useState({});

  useEffect(() => {
    return () => {
      setState({});
    };
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <CompletedChart/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "ghostwhite",
  },
});

