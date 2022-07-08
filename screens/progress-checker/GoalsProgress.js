import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { Card, Text } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import styles from "./ProgressChecker.style";
import GoalsChart from "../../components/progress-checker/GoalsChart";
import TitleCard from "../../components/progress-checker/TitleCard";
import GoalsTimeChart from "../../components/progress-checker/GoalsTimeChart";

export default GoalsProgress = ({ navigation }) => {
  const user = supabase.auth.user();
  const isFocused = useIsFocused();

  const [completed, setCompleted] = useState(0);
  const [pending, setPending] = useState(0);
  const [state, setState] = useState({});

  useEffect(() => {
    getCompleted();
    getPending();
    return () => {
      setState({});
    };
  }, [isFocused]);

  const getCompleted = async () => {
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

      if (!data) return;

      setCompleted(data.completed);

    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const getPending = async () => {
    try {
      if (!user) throw new Error("No user on the session!");

      let { data, error, status } = await supabase
        .from("goals")
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
        {/* <TitleCard type="Goals"/> */}
        <View style={styles.topRowContainer}>
          <Card containerStyle={styles.topRowCard}>
            <Text style={styles.topRowCardText}>{completed}</Text>
            <Text style={{ alignSelf: "center" }}>
              Goal{completed != 1 ? "s" : ""} Achieved
            </Text>
          </Card>
          <Card containerStyle={styles.topRowCard}>
            <Text style={styles.topRowCardText}>{pending}</Text>
            <Text style={{ alignSelf: "center" }}>
              Ongoing Goal{pending != 1 ? "s" : ""}
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
          <GoalsChart />
        </Card>
        <Card
          containerStyle={{
            padding: 0,
            alignSelf: "stretch",
            elevation: 5,
            borderRadius: 5,
          }}
        >
          <GoalsTimeChart />
        </Card>
      </ScrollView>
    </View>
  );
};
