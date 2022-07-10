import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import {
  VictoryArea,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
} from "victory-native";
import supabase from "../../lib/supabase";
import { Text } from "react-native-elements";

export default SavingsTimeChart = () => {
  const user = supabase.auth.user();
  const isFocused = useIsFocused();

  const today = new Date().toLocaleDateString("en-us", { weekday: "short" });

  const defaultData = [
    { x: "Jan", y: 0 },
    { x: "Feb", y: 0 },
    { x: "Mar", y: 0 },
    { x: "Apr", y: 0 },
    { x: "May", y: 0 },
    { x: "Jun", y: 0 },
    { x: "Jul", y: 0 },
    { x: "Aug", y: 0 },
    { x: "Sep", y: 0 },
    { x: "Oct", y: 0 },
    { x: "Nov", y: 0 },
    { x: "Dec", y: 0 },
  ];

  const [months, setMonths] = useState(defaultData);

  useEffect(() => {
    getData();
  }, [isFocused, months]);

  const getMonthOfYear = (date) => {
    const monthNum = new Date(date).getMonth();
    return isNaN(monthNum)
      ? null
      : [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ][monthNum];
  };

  const getData = async () => {
    let m = [...defaultData];

    const oneYearAgo = new Date(Date.now() - 364 * 24 * 60 * 60 * 1000);

    oneYearAgo.setMonth(oneYearAgo.getMonth() + 1, 1);
    oneYearAgo.setHours(0, 0, 0, 0);

    try {
      if (!user) throw new Error("No user on the session!");

      let { data, error, status } = await supabase
        .from("savings")
        .select("completed_at, curr_amount")
        .match({ user_id: user.id, completion_status: true })
        .gt("completed_at", oneYearAgo.toISOString());

      if (error && status !== 406) {
        throw error;
      }

      data.forEach(
        (obj) =>
          (obj.month = getMonthOfYear(
            new Date(obj.completed_at).toLocaleString("en-US", {
              timeZone: "Asia/Singapore",
            })
          ))
      );

      for (let i = 0; i < data.length; i++) {
        const obj = m.filter((o) => o.x == data[i].month)[0];
        obj.y += parseFloat(data[i].curr_amount, 10);
      }

      let stateChanged = false;
      for (let i = 0; i < m.length; i++) {
        if (m[i].y != months[i].y) {
          stateChanged = true;
          break;
        }
      }

      if (stateChanged) setMonths(m);
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Monthly Savings</Text>
      <VictoryChart
        height={350}
        width={350}
        theme={VictoryTheme.material}
        animate={{
          duration: 500,
        }}
        domainPadding={{ y: 20 }}
      >
        <VictoryAxis
          dependentAxis={true}
          tickFormat={(y) => "$" + y}
          // label="Amount Saved ($)"
          style={{
            axisLabel: { padding: 30, fontWeight: "bold" },
            tickLabels: { fontSize: 10 },
          }}
        />
        <VictoryAxis
          label="Months"
          style={{
            axisLabel: { padding: 30, fontWeight: "bold" },
            tickLabels: { fontSize: 11 },
          }}
        />
        <VictoryArea
          style={{ data: { fill: "darkgoldenrod", opacity: 0.6 } }}
          animate={{
            duration: 500,
          }}
          labels={({ datum }) => (datum.y == 0 ? null : "$" + datum.y)}
          data={months}
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
    marginBottom: -30,
  },
});
