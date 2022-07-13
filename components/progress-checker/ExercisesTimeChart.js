import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import {
  VictoryArea,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
  VictoryLabel,
} from "victory-native";
import supabase from "../../lib/supabase";
import { Text } from "react-native-elements";

export default ExercisesTimeChart = () => {
  const user = supabase.auth.user();
  const isFocused = useIsFocused();

  const defaultData = [
    { x: "Mon", y: 0 },
    { x: "Tue", y: 0 },
    { x: "Wed", y: 0 },
    { x: "Thu", y: 0 },
    { x: "Fri", y: 0 },
    { x: "Sat", y: 0 },
    { x: "Sun", y: 0 },
  ];

  const today = new Date().toLocaleDateString("en-us", { weekday: "short" });

  const [days, setDays] = useState(defaultData);

  useEffect(() => {
    getData();
  }, [isFocused, days]);

  const getDayOfWeek = (date) => {
    const dayOfWeek = new Date(date).getDay();
    return isNaN(dayOfWeek)
      ? null
      : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][dayOfWeek];
  };

  const getData = async () => {
    let d = [...defaultData];

    const sevenDaysAgo = new Date(Date.now() - 6 * 24 * 60 * 60 * 1000);

    sevenDaysAgo.setHours(0, 0, 0, 0);

    try {
      if (!user) throw new Error("No user on the session!");

      let { data, error, status } = await supabase
        .from("exercises")
        .select("completed_at")
        .match({ user_id: user.id, completion_status: true })
        .gt("completed_at", sevenDaysAgo.toISOString());

      if (error && status !== 406) {
        throw error;
      }

      data = data
        .map((obj) =>
          new Date(obj.completed_at).toLocaleString("en-US", {
            timeZone: "Asia/Singapore",
          })
        )
        .sort()
        .map((date) => getDayOfWeek(date));

      for (let i = 0; i < data.length; i++) {
        d.filter((o) => o.x == data[i])[0].y++;
      }

      let stateChanged = false;
      for (let i = 0; i < d.length; i++) {
        if (d[i].y != days[i].y) {
          stateChanged = true;
          break;
        }
      }

      if (stateChanged) setDays(d);
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Daily Exercises</Text>
      <VictoryChart
        height={350}
        width={350}
        theme={VictoryTheme.material}
        animate={{
          duration: 200,
        }}
        domainPadding={{ y: 20 }}
      >
        <VictoryAxis
          dependentAxis={true}
          tickFormat={(y) => {
            if (y == Math.floor(y)) {
              return y;
            }
          }}
          label="Number Completed"
          style={{ axisLabel: { padding: 30, fontWeight: "bold" } }}
        />
        <VictoryAxis
          label="Days"
          style={{
            axisLabel: { padding: 30, fontWeight: "bold" },
          }}
        />
        <VictoryArea
          style={{ data: { fill: "darkmagenta", opacity: 0.6 } }}
          animate={{
            duration: 200,
          }}
          labels={({ datum }) => (datum.y == 0 ? null : Math.floor(datum.y))}
          labelComponent={
            <VictoryLabel
              textAnchor={({ datum }) =>
                datum.x == "Mon" ? "start" : datum.x == "Sun" ? "end" : "middle"
              }
            />
          }
          data={days}
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
