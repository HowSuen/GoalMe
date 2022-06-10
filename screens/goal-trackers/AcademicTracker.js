import React, { useEffect, useState } from "react";
import {
  View,
  StatusBar,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import styles from "./GoalTracker.style";
import AddAcademic from "../../components/goal-trackers/AddAcademic";
import GoalList from "../../components/goal-trackers/GoalList";
import Empty from "./Empty";
import supabase from "../../lib/supabase";
import { useIsFocused } from "@react-navigation/native";

export default AcademicTracker = ({ navigation }) => {
  const [data, setData] = useState([]);
  const user = supabase.auth.user();
  const isFocused = useIsFocused();

  useEffect(() => {
    setData([]);
    (async () => {
      let { data: goals, error } = await supabase
        .from("goals")
        .select("*")
        .match({
          user_id: user.id,
          type: "academic",
          completion_status: false,
        });
      
      if (error) Alert.alert(error)
      goals.sort((a, b) => a.id - b.id);
      goals.map((goal) => {
        setData((prevGoal) => {
          return [
            {
              value: goal.content,
              key: goal.id,
              type: goal.type,
              description: goal.description,
            },
            ...prevGoal,
          ];
        });
      });
    })();
  }, [isFocused]);

  const submitHandler = async (value) => {
    const { data, error } = await supabase
      .from("goals")
      .insert([{ user_id: user.id, content: value, type: "academic" }]);

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
                navigation={navigation}
              />
            )}
          />
          <View>
            <AddAcademic submitHandler={submitHandler} />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
