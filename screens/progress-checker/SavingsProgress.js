import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { Card, Text } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import styles from "./ProgressChecker.style";
import CompletedModulesChart from "../../components/progress-checker/CompletedModulesChart";

export default SavingsProgress = () => {
  const user = supabase.auth.user();
  const isFocused = useIsFocused();

  const [completed, setCompleted] = useState(0);
  const [pending, setPending] = useState(0);

  useEffect(() => {
    getCompleted();
    getPending();
  }, [isFocused]);

  const getCompleted = async () => {
    try {
      if (!user) throw new Error("No user on the session!");

      let { data, error, status } = await supabase
        .from("savings")
        .select("id")
        .match({ user_id: user.id, completion_status: true });

      if (error && status !== 406) {
        throw error;
      }

      setCompleted((data || []).length);
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const getPending = async () => {
    try {
      if (!user) throw new Error("No user on the session!");

      let { data, error, status } = await supabase
        .from("savings")
        .select("id")
        .match({ user_id: user.id, completion_status: false });

      if (error && status !== 406) {
        throw error;
      }

      if (!data) return;

      setPending(data.length);
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const getOneYearSum = async () => {
    let sum = 0;

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

      if (!data || data.length == 0) return;

      sum = data
        .map((o) => parseFloat(o.curr_amount, 10))
        .reduce((a, b) => a + b);

      setOneYearSavings(sum);
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const getThirtyDaysSum = async () => {
    let sum = 0;

    const thirtyDaysAgo = new Date(Date.now() - 29 * 24 * 60 * 60 * 1000);

    thirtyDaysAgo.setHours(0, 0, 0, 0);

    try {
      if (!user) throw new Error("No user on the session!");

      let { data, error, status } = await supabase
        .from("savings")
        .select("completed_at, curr_amount")
        .match({ user_id: user.id, completion_status: true })
        .gt("completed_at", thirtyDaysAgo.toISOString());

      if (error && status !== 406) {
        throw error;
      }

      if (!data || data.length == 0) return;

      sum = data
        .map((o) => parseFloat(o.curr_amount, 10))
        .reduce((a, b) => a + b);

      setThirtyDaysSavings(sum);
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const currencyFormat = (str) => {
    const num = parseFloat(str.replace(",", ""), 10);
    return "$" + num.toPrecision().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <TitleCard type="Savings" />
        <View style={styles.topRowContainer}>
          <Card containerStyle={styles.topRowCard}>
            <Text style={styles.topRowCardText}>{completed}</Text>
            <Text style={{ alignSelf: "center" }}>
              Saving Goal{completed != 1 ? "s" : ""} Achieved
            </Text>
          </Card>
          <Card containerStyle={styles.topRowCard}>
            <Text style={styles.topRowCardText}>{pending}</Text>
            <Text style={{ alignSelf: "center" }}>
              Ongoing Saving Goal{pending != 1 ? "s" : ""}
            </Text>
          </Card>
        </View>
        <Card containerStyle={{ padding: 0 }}>
          <CompletedModulesChart />
        </Card>
      </ScrollView>
    </View>
  );
};
