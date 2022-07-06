import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Card } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import CompletedGoalsChart from "../../components/progress-checker/CompletedGoalsChart";
import CompletedModulesChart from "../../components/progress-checker/CompletedModulesChart";
import { Text } from "react-native-elements";

export default ProgressChecker = () => {
  const isFocused = useIsFocused();

  const [state, setState] = useState({});

  useEffect(() => {
    return () => {
      setState({});
    };
  }, [isFocused]);

  return (
    <View style={styles.container} >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Card containerStyle={{ padding: 0 }}>
          <CompletedGoalsChart />
        </Card>
        <Card containerStyle={{ padding: 0 }}>
          <CompletedModulesChart />
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "ghostwhite",
    paddingTop: 60,
  },
  scrollView: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "ghostwhite",
  },
  
});
