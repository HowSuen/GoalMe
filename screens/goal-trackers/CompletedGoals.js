import React, { useEffect, useState } from "react";
import { Alert, View, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
import styles from "./CompletedGoals.style";
import CompletedList from "../../components/goal-trackers/CompletedList";
import Empty from "./Empty";
import supabase from "../../lib/supabase";

export default CompletedGoals = () => {
  const [data, setData] = useState([]);
  const user = supabase.auth.user();

  useEffect(() => {
    setData([]);
    (async () => {
      try {
        let { data: goals, error } = await supabase
          .from("goals")
          .select("*")
          .match({ user_id: user.id, completion_status: true });

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
  }, []);

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

  const uncompleteGoal = async (key) => {
    try {
      let { data, error } = await supabase
        .from("goals")
        .update({ completion_status: false })
        .match({ id: key });

      if (error) throw error;
    } catch (error) {
      Alert.alert(error.message);
    }

    setData((prevGoal) => {
      return prevGoal.filter((goal) => goal.key != key);
    });
  };

  const deleteAll = async () => {
    try {
      let { data, error } = await supabase
        .from("goals")
        .delete()
        .match({ completion_status: true });

      if (error) throw error;
    } catch (error) {
      Alert.alert(error.message);
    }

    setData((prevGoal) => {
      return prevGoal.filter((goal) => false);
    });
  };

  return (
    <View style={styles.container}>
      <View>
        <FlatList
          data={data}
          ListEmptyComponent={() => <Empty />}
          keyExtractor={(goal) => goal.key}
          renderItem={({ item }) => (
            <CompletedList
              goal={item}
              deleteGoal={deleteGoal}
              uncompleteGoal={uncompleteGoal}
            />
          )}
        />
        <TouchableOpacity style={styles.deleteButton} onPress={deleteAll}>
          <FontAwesome name="trash" size={25} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
