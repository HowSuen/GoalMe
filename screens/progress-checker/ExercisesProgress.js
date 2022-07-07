import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Card, Text } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import styles from "./ProgressChecker.style";
import CompletedModulesChart from "../../components/progress-checker/CompletedModulesChart";

export default ExercisesProgress = () => {
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
        .from("exercises")
        .select("id")
        .match({ user_id: user.id, completion_status: true })

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
        .from("exercises")
        .select("id")
        .match({ user_id: user.id, completion_status: false });

      if (error && status !== 406) {
        throw error;
      }

      setPending((data || []).length);
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <TitleCard type="Exercises" />
        <View style={styles.topRowContainer}>
          <Card containerStyle={styles.topRowCard}>
            <Text style={styles.topRowCardText}>{completed}</Text>
            <Text style={{ alignSelf: "center" }}>Exercise{completed != 1 ? "s" : ""} Completed</Text>
          </Card>
          <Card containerStyle={styles.topRowCard}>
            <Text style={styles.topRowCardText}>{pending}</Text>
            <Text style={{ alignSelf: "center" }}>Ongoing Exercise{pending != 1 ? "s" : ""}</Text>
          </Card>
        </View>
        <Card containerStyle={{ padding: 0 }}>
          <CompletedModulesChart />
        </Card>
      </ScrollView>
    </View>
  );
};
