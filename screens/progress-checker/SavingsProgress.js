import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Card, Text } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import styles from "./ProgressChecker.style";
import SavingsTimeChart from "../../components/progress-checker/SavingsTimeChart";

export default SavingsProgress = () => {
  const user = supabase.auth.user();
  const isFocused = useIsFocused();

  const [completed, setCompleted] = useState(0);
  const [pending, setPending] = useState(0);
  const [totalSavings, setTotalSavings] = useState(0);
  const [highestSavings, setHighestSavings] = useState(0);
  const [oneYearSavings, setOneYearSavings] = useState(0);

  useEffect(() => {
    getExpData();
    getPending();
    getOneYearSum();
  }, [isFocused]);

  const getExpData = async () => {
    try {
      if (!user) throw new Error("No user on the session!");

      let { data, error, status } = await supabase
        .from("experience")
        .select("completedSavings, totalSavings, highestSavings")
        .match({ id: user.id })
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (!data) return;

      setCompleted(data.completedSavings);
      setTotalSavings(data.totalSavings);
      setHighestSavings(data.highestSavings);
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

      sum = data
        .map((o) => parseFloat(o.curr_amount, 10))
        .reduce((a, b) => a + b);
  
      setOneYearSavings(sum);
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* <TitleCard type="Exercises" /> */}
        <View style={styles.topRowContainer}>
          <Card containerStyle={styles.topRowCard}>
            <Text style={styles.topRowCardText}>{completed}</Text>
            <Text
              style={{ alignSelf: "center" }}
              adjustsFontSizeToFit={true}
              numberOfLines={1}
            >
              Saving Goal{completed != 1 ? "s" : ""} Achieved
            </Text>
          </Card>
          <Card containerStyle={styles.topRowCard}>
            <Text style={styles.topRowCardText}>{pending}</Text>
            <Text
              style={{ alignSelf: "center" }}
              adjustsFontSizeToFit={true}
              numberOfLines={1}
            >
              Ongoing Saving Goal{pending != 1 ? "s" : ""}
            </Text>
          </Card>
        </View>
        <View style={styles.topRowContainer}>
          <Card containerStyle={styles.topRowCard}>
            <Text
              style={styles.topRowCardText}
              adjustsFontSizeToFit={true}
              numberOfLines={1}
            >
              ${totalSavings}
            </Text>
            <Text style={{ alignSelf: "center" }}>Total Saved</Text>
          </Card>
          <Card containerStyle={styles.topRowCard}>
            <Text
              style={styles.topRowCardText}
              adjustsFontSizeToFit={true}
              numberOfLines={1}
            >
              ${oneYearSavings}
            </Text>
            <Text
              style={{ alignSelf: "center" }}
              adjustsFontSizeToFit={true}
              numberOfLines={1}
            >
              Saved in The Past Year
            </Text>
          </Card>
        </View>
        <Card
          containerStyle={{
            padding: 0,
            alignSelf: "stretch",
            elevation: 5,
            borderRadius: 5,
          }}
        >
          <SavingsTimeChart />
        </Card>
      </ScrollView>
    </View>
  );
};
