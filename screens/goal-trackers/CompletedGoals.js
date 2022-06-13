import React, { useEffect, useState } from "react";
import { Alert, View, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
import styles from "./CompletedGoals.style";
import CompletedList from "../../components/goal-trackers/CompletedList";
import Empty from "./Empty";
import supabase from "../../lib/supabase";
import { orders, sortItems, deleteItem } from "./GoalTracker";

const orderBys = [
  { label: "Date Completed", value: "dateCompleted" },
  { label: "Difficulty", value: "difficulty" },
  { label: "Type", value: "type" },
];

const uncompleteItem = async (item) => {
  try {
    let { data, error } = await supabase
      .from("goals")
      .update({ completion_status: false, completed_at: null })
      .match({ id: item.key });

    if (error) throw error;
  } catch (error) {
    Alert.alert(error.message);
  }
};

const deleteAllItems = async () => {
  try {
    let { data, error } = await supabase
      .from("goals")
      .delete()
      .match({ completion_status: true });

    if (error) throw error;
  } catch (error) {
    Alert.alert(error.message);
  }
};

export default CompletedGoals = () => {
  const [data, setData] = useState([]);
  const [order, setOrder] = useState("descending");
  const [orderBy, setOrderBy] = useState("dateCompleted");
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

        goals.sort(sortItems(order, orderBy));
        goals.map((goal) => {
          setData((prevGoal) => {
            return [
              {
                key: goal.id,
                content: goal.content,
                description: goal.description,
                type: goal.type,
                difficulty: goal.difficulty,
                completed_at: new Date(goal.completed_at),
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
    setData((goals) => {
      return goals.sort(sortItems(order, orderBy));
    });
  };

  const deleteGoal = async (goal) => {
    deleteItem(goal);
    setData((goals) => {
      return goals.filter((g) => g != goal);
    });
  };

  const uncompleteGoal = async (goal) => {
    uncompleteItem(goal);
    setData((goals) => {
      return goals.filter((g) => g != goal);
    });
  };

  const deleteAllGoals = async () => {
    deleteAllItems();
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
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={deleteAllGoals}
          >
            <FontAwesome name="trash" size={25} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
