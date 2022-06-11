import React, { useEffect, useState } from "react";
import { View, StatusBar, FlatList, TouchableOpacity } from "react-native";
import styles from "./GoalTracker.style";
import { FontAwesome } from "@expo/vector-icons";
import GoalList from "../../components/goal-trackers/GoalList";
import Empty from "./Empty";
import supabase from "../../lib/supabase";
import { useIsFocused, useRoute } from "@react-navigation/native";

export default FinanceTracker = ({ navigation }) => {
  const [data, setData] = useState([]);
  const user = supabase.auth.user();
  const isFocused = useIsFocused();
  const route = useRoute();

  useEffect(() => {
    setData([]);
    (async () => {
      let { data: goals, error } = await supabase
        .from("goals")
        .select("*")
        .match({
          user_id: user.id,
          type: "Finance",
          completion_status: false,
        });

      if (error) Alert.alert(error);
      goals.sort((a, b) => a.id - b.id);
      goals.map((goal) => {
        setData((prevGoal) => {
          return [
            {
              key: goal.id,
              value: goal.content,
              description: goal.description,
              type: goal.type,
            },
            ...prevGoal,
          ];
        });
      });
    })();
  }, [isFocused]);

  const deleteGoal = async (key) => {
    const { data, error } = await supabase
      .from("goals")
      .delete()
      .match({ id: key });

    if (error) Alert.alert(error);
    setData((prevGoal) => {
      return prevGoal.filter((goal) => goal.key != key);
    });
  };

  const completeGoal = async (key) => {
    const { data, error } = await supabase
      .from("goals")
      .update({ completion_status: true })
      .match({ id: key });

    if (error) Alert.alert(error);
    setData((prevGoal) => {
      return prevGoal.filter((goal) => goal.key != key);
    });
  };

  return (
    <View style={styles.componentContainer}>
      <View>
        <StatusBar barStyle="light-content" backgroundColor="black" />
      </View>

      <View>
        <FlatList
          style={styles.listContainer}
          data={data}
          ListEmptyComponent={() => <Empty />}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <GoalList
              item={item}
              deleteItem={deleteGoal}
              completeItem={completeGoal}
              navigation={navigation}
            />
          )}
        />
        <TouchableOpacity
          style={styles.financeButton}
          onPress={() => {
            navigation.navigate("GoalSetter", {
              user: user,
              routeName: route.name,
              defaultType: "Finance",
            });
          }}
        >
          <FontAwesome name="plus" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
