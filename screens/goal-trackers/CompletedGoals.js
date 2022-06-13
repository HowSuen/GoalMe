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
  const [order, setOrder] = useState("descending");
  const [orderBy, setOrderBy] = useState("dateCompleted");
  const user = supabase.auth.user();

  const orders = [
    { label: "Ascending", value: "ascending" },
    { label: "Descending", value: "descending" },
  ];

  const orderBys = [
    { label: "Date Completed", value: "dateCompleted" },
    { label: "Difficulty", value: "difficulty" },
  ];

  useEffect(() => {
    setData([]);
    (async () => {
      try {
        let { data: goals, error } = await supabase
          .from("goals")
          .select("*")
          .match({ user_id: user.id, completion_status: true });

        if (error) throw error;

        goals.sort((a, b) => a.completion_date - b.completion_date);
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

  const sortGoals = (order, orderBy) => {
    const convert = (d) => {
      if (d == "Hard") {
        return 3;
      } else if (d == "Medium") {
        return 2;
      } else if (d == "Easy") {
        return 1;
      } else {
        return 0;
      }
    };

    let comparator;
    if (orderBy == "dateCompleted") {
      comparator = (a, b) =>
        order == "ascending" ? a.key - b.key : b.key - a.key;
    } else if (orderBy == "difficulty") {
      comparator = (a, b) =>
        order == "ascending"
          ? convert(a.difficulty) - convert(b.difficulty)
          : convert(b.difficulty) - convert(a.difficulty);
    }

    setData((goals) => {
      return goals.sort(comparator);
    });
  };

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

    setData((goals) => {
      return goals.filter((goal) => goal.key != key);
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

    setData((goals) => {
      return goals.filter((goal) => goal.key != key);
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

    setData([]);
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
        <View style={styles.bottomContainer}>
          <SortButton
            value={orderBy}
            items={orderBys}
            onValueChange={(orderBy) => {
              setOrderBy(orderBy);
              sortGoals(order, orderBy);
            }}
          />
          <SortButton
            value={order}
            items={orders}
            onValueChange={(order) => {
              setOrder(order);
              sortGoals(order, orderBy);
            }}
          />
          <TouchableOpacity style={styles.deleteButton} onPress={deleteAll}>
            <FontAwesome name="trash" size={25} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
