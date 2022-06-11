import React, { useEffect, useState } from "react";
import {
  Alert,
  View,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from "react-native";
import styles from "./GoalTracker.style";
import { FontAwesome } from "@expo/vector-icons";
import GoalList from "../../components/goal-trackers/GoalList";
import Empty from "./Empty";
import supabase from "../../lib/supabase";
import { useIsFocused, useRoute } from "@react-navigation/native";

export default GoalTracker = ({ navigation }) => {
  const [data, setData] = useState([]);
  const user = supabase.auth.user();
  const isFocused = useIsFocused();
  const route = useRoute();

  useEffect(() => {
    setData([]);
    (async () => {
      try {
        let { data: goals, error } = await supabase
          .from("goals")
          .select("*")
          .match({
            user_id: user.id,
            type: "Academic",
            completion_status: false,
          });

        if (error) throw error;

        goals.sort((a, b) => a.id - b.id);
        goals.map((goal) => {
          setData((prevGoal) => {
            return [
              {
                key: goal.id,
                content: goal.content,
                description: goal.description,
                type: goal.type,
                difficulty: goal.difficulty,
              },
              ...prevGoal,
            ];
          });
        });
      } catch (error) {
        Alert.alert(error.message);
      }
    })();
  }, [isFocused]);

  const deleteGoal = async (key) => {
    try {
      let { data, error } = await supabase
        .from("goals")
        .delete()
        .match({ id: key });

      if (error) throw error;
    } catch (error) {
      Alert.alert(error.message);
    }

    setData((prevGoal) => {
      return prevGoal.filter((goal) => goal.key != key);
    });
  };

  const completeGoal = async (key) => {
    try {
      let { data, error } = await supabase
        .from("goals")
        .update({ completion_status: true })
        .match({ id: key });

      if (error) throw error;
    } catch (error) {
      Alert.alert(error.message);
    }

    setData((prevGoal) => {
      return prevGoal.filter((goal) => goal.key != key);
    });
  };

  return (
    <View style={styles.container}>
      <View>
        <StatusBar barStyle="light-content" backgroundColor="black" />
      </View>

      <View>
        <FlatList
          data={data}
          ListEmptyComponent={() => <Empty />}
          keyExtractor={(goal) => goal.key}
          renderItem={({ item }) => (
            <GoalList
              goal={item}
              deleteGoal={deleteGoal}
              completeGoal={completeGoal}
              navigation={navigation}
            />
          )}
        />
        <TouchableOpacity
          style={styles.academicButton}
          onPress={() => {
            navigation.navigate("GoalSetter", {
              user: user,
              routeName: route.name,
              defaultType: "Academic",
            });
          }}
        >
          <FontAwesome name="plus" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
