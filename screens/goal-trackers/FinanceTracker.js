import React, { useEffect, useState } from "react";
import {
  View,
  StatusBar,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import styles from "./GoalTracker.style";
import AddFinance from "../../components/goal-trackers/AddFinance";
import GoalList from "../../components/goal-trackers/GoalList";
import Empty from "./Empty";

export default FinanceTracker = () => {
  const [data, setData] = useState([]);
  const user = supabase.auth.user();

  useEffect(() => {
    (async () => {
      let { data: goals, error } = await supabase
        .from("goals")
        .select("*")
        .match({ user_id: user.id, type: "finance", completion_status: false });

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

  const submitHandler = async (value) => {
    const { data, error } = await supabase
      .from("goals")
      .insert([{ user_id: user.id, content: value, type: "finance" }]);

    !error &&
      setData((prevGoal) => {
        return [
          {
            value: data[0].content,
            key: data[0].id,
            type: data[0].type,
          },
          ...prevGoal,
        ];
      });
  };

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

  const completeItem = async (key) => {
    const { data, error } = await supabase
      .from("goals")
      .update({ completion_status: true })
      .match({ id: key });

    !error &&
      setData((prevGoal) => {
        return prevGoal.filter((goal) => goal.key != key);
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "height" : ""}
      keyboardVerticalOffset={90}
    >
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
              <GoalList
                item={item}
                deleteItem={deleteItem}
                completeItem={completeItem}
              />
            )}
          />
          <View>
            <AddFinance submitHandler={submitHandler} />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
