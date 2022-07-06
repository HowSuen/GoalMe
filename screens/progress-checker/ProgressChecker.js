import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Card } from "react-native-elements";
import CompletedGoalsChart from "../../components/progress-checker/CompletedGoalsChart";

export default ProgressChecker = () => {
  const isFocused = useIsFocused();

  const [state, setState] = useState({});

  useEffect(() => {
    return () => {
      setState({});
    };
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <Card containerStyle={{ padding: 0 }}>
        <CompletedGoalsChart />
      </Card>
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
