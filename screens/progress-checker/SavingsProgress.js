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
  const [totalSavings, setTotalSavings] = useState("No Data");
  const [highestSavings, setHighestSavings] = useState("No Data");

  useEffect(() => {
    getExpData();
    getPending();
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
      if (data.totalSavings > 0) setTotalSavings(data.totalSavings);
      if (data.highestSavings > 0) setHighestSavings(data.highestSavings);
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
              ${highestSavings}
            </Text>
            <Text style={{ alignSelf: "center" }}>Highest Saved</Text>
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
