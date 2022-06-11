import React, { useEffect, useState } from "react";
import { View, StatusBar, FlatList } from "react-native";
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
      let { data: goals, error } = await supabase
        .from("goals")
        .select("*")
        .match({ user_id: user.id, completion_status: true });

      !error &&
        goals.map((goal) => {
          setData((prevGoal) => {
            return [
              {
                value: goal.content,
                key: goal.id,
                type: goal.type,
              },
              ...prevGoal,
            ];
          });
        });
    })();
  }, []);

  const deleteItem = async (key) => {
    const { data, error } = await supabase
      .from("goals")
      .delete()
      .match({ id: key });

    !error &&
      setData((prevGoal) => {
        return prevGoal.filter((goal) => goal.key != key);
      });
  };

  const uncompleteItem = async (key) => {
    const { data, error } = await supabase
      .from("goals")
      .update({ completion_status: false })
      .match({ id: key });

    !error &&
      setData((prevGoal) => {
        return prevGoal.filter((goal) => goal.key != key);
      });
  };

  const deleteAll = async () => {
    const { data, error } = await supabase
      .from("goals")
      .delete()
      .match({ completion_status: true });

    !error &&
      setData((prevGoal) => {
        return prevGoal.filter((goal) => false);
      });
  };

  return (
    <View style={styles.componentContainer}>
      <View>
        <StatusBar barStyle="light-content" backgroundColor="black" />
      </View>

      <View>
        <FlatList
          data={data}
          ListEmptyComponent={() => <Empty />}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <CompletedList
              item={item}
              deleteItem={deleteItem}
              uncompleteItem={uncompleteItem}
            />
          )}
        />
        <TouchableOpacity style={styles.deleteButton} onPress={deleteAll}>
          <FontAwesome name="trash" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
