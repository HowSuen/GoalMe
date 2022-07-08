import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { Card, Text } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import styles from "./ProgressChecker.style";
import CompletedModulesChart from "../../components/progress-checker/CompletedModulesChart";
import TitleCard from "../../components/progress-checker/TitleCard";
import { compareGrade } from "../goal-trackers/Modules";

export default ModulesProgress = () => {
  const user = supabase.auth.user();
  const isFocused = useIsFocused();

  const [completed, setCompleted] = useState(0);
  const [pending, setPending] = useState(0);
  const [highestGrade, setHighestGrade] = useState("No Data");
  const [modeGrade, setModeGrade] = useState("No Data");
  const [targetReached, setTargetReached] = useState(0);
  const [aboveA, setAboveA] = useState(0);

  useEffect(() => {
    getExpData();
    getPending();
    getGrades();
  }, [isFocused]);

  const getExpData = async () => {
    try {
      if (!user) throw new Error("No user on the session!");

      let { data, error, status } = await supabase
        .from("experience")
        .select("completedMod, modsTargetReached, aboveA, highestGrade")
        .match({ id: user.id })
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (!data) return;

      setCompleted(data.completedMod);
      setTargetReached(data.modsTargetReached);
      setAboveA(data.aboveA);
      if (data.highestGrade) setHighestGrade(data.highestGrade);
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const getGrades = async () => {
    try {
      if (!user) throw new Error("No user on the session!");

      let { data, error, status } = await supabase
        .from("modules")
        .select("grade_received")
        .match({ user_id: user.id, completion_status: true });

      if (error && status !== 406) {
        throw error;
      }

      if (!data) return;

      // setHighestGrade(
      //   data
      //     .map((o) => o.grade_received)
      //     .reduce((a, b) => {
      //       return compareGrade(a, b) < 0 ? b : a;
      //     })
      // );

      // setNumA(
      //   data
      //     .map((o) => o.grade_received)
      //     .reduce((a, b) => {
      //       return compareGrade(b, "A") >= 0 ? a + 1 : a;
      //     }, 0)
      // );

      const mode = (arr) => {
        const store = {};
        arr.forEach((o) => (store[o] ? (store[o] += 1) : (store[o] = 1)));
        return Object.keys(store).sort((a, b) =>
          store[b] - store[a] == 0 ? compareGrade(b, a) : store[b] - store[a]
        )[0];
      };

      setModeGrade(mode(data.map((o) => o.grade_received)));
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const getPending = async () => {
    try {
      if (!user) throw new Error("No user on the session!");

      let { data, error, status } = await supabase
        .from("modules")
        .select("module_code, module_name, grade_received")
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
        {/* <TitleCard type="Modules" /> */}
        <View style={styles.topRowContainer}>
          <Card containerStyle={styles.topRowCard}>
            <Text style={styles.topRowCardText}>{completed}</Text>
            <Text style={{ alignSelf: "center", fontSize: 13 }}>
              Module{completed != 1 ? "s" : ""} Completed
            </Text>
          </Card>
          <Card containerStyle={styles.topRowCard}>
            <Text style={styles.topRowCardText}>{pending}</Text>
            <Text style={{ alignSelf: "center" }}>
              Ongoing Module{pending != 1 ? "s" : ""}
            </Text>
          </Card>
        </View>
        <View style={styles.topRowContainer}>
          <Card containerStyle={styles.topRowCard}>
            <Text style={styles.topRowCardText}>{targetReached}</Text>
            <Text style={{ alignSelf: "center", fontSize: 10 }}>
              Target Grade{targetReached != 1 ? "s" : ""} Achieved
            </Text>
          </Card>
          <Card containerStyle={styles.topRowCard}>
            <Text style={styles.topRowCardText}>{aboveA}</Text>
            <Text style={{ alignSelf: "center" }}>
              A{aboveA != 1 ? "'s and" : "or"} above
            </Text>
          </Card>
        </View>
        <View style={styles.topRowContainer}>
          <Card containerStyle={styles.topRowCard}>
            <Text style={styles.topRowCardText}>{highestGrade}</Text>
            <Text style={{ alignSelf: "center" }}>Highest Grade</Text>
          </Card>
          <Card containerStyle={styles.topRowCard}>
            <Text style={styles.topRowCardText}>{modeGrade}</Text>
            <Text style={{ alignSelf: "center", fontSize: 12 }}>
              Most Common Grade
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
          <CompletedModulesChart />
        </Card>
      </ScrollView>
    </View>
  );
};