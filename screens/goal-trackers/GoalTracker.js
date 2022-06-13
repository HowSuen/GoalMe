import React, { useEffect, useState } from "react";
import { Alert, View, FlatList, TouchableOpacity } from "react-native";
import styles from "./GoalTracker.style";
import { FontAwesome } from "@expo/vector-icons";
import GoalList from "../../components/goal-trackers/GoalList";
import Empty from "./Empty";
import supabase from "../../lib/supabase";
import { useIsFocused, useRoute } from "@react-navigation/native";
import SortButton from "../../components/goal-trackers/SortButton";

const orders = [
  { label: "Ascending", value: "ascending" },
  { label: "Descending", value: "descending" },
];

const orderBys = [
  { label: "Date Created", value: "dateCreated" },
  { label: "Date Updated", value: "dateUpdated" },
  { label: "Difficulty", value: "difficulty" },
];

const sortItems = (order, orderBy) => {
  const convertDiff = (d) => {
    if (d == "None") {
      return 0;
    } else if (d == "Easy") {
      return 1;
    } else if (d == "Medium") {
      return 2;
    } else {
      return 3;
    }
  };

  const convertType = (t) => {
    console.log(t)
    if (t == "General") {
      return 0;
    } else if (t == "Academic") {
      return 1;
    } else if (t == "Fitness") {
      return 2;
    } else {
      return 3;
    }
  };

  let comparator;
  if (orderBy == "dateCreated") {
    comparator = (a, b) =>
      order == "ascending" ? a.key - b.key : b.key - a.key;
  } else if (orderBy == "dateUpdated") {
    comparator = (a, b) =>
      order == "ascending"
        ? a.updated_at - b.updated_at
        : b.updated_at - a.updated_at;
  } else if (orderBy == "dateCompleted") {
    comparator = (a, b) =>
      order == "ascending"
        ? a.completed_at - b.completed_at
        : b.completed_at - a.completed_at;
  } else if (orderBy == "difficulty") {
    comparator = (a, b) =>
      order == "ascending"
        ? convertDiff(a.difficulty) - convertDiff(b.difficulty)
        : convertDiff(b.difficulty) - convertDiff(a.difficulty);
  } else if (orderBy == "type") {
    comparator = (a, b) =>
      order == "ascending"
        ? convertType(a.type) - convertType(b.type)
        : convertType(b.type) - convertType(b.type);
  }

  return comparator;
};

const completeItem = async (item) => {
  try {
    let { data, error } = await supabase
      .from("goals")
      .update({
        completion_status: true,
        completed_at: new Date().toISOString().toLocaleString(),
      })
      .match({ id: item.key });

    if (error) throw error;
  } catch (error) {
    Alert.alert(error.message);
  }
};

const deleteItem = async (item) => {
  try {
    let { data, error } = await supabase
      .from("goals")
      .delete()
      .match({ id: item.key });

    if (error) throw error;
  } catch (error) {
    Alert.alert(error.message);
  }
};

export default GoalTracker = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [order, setOrder] = useState("ascending");
  const [orderBy, setOrderBy] = useState("dateCreated");
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
          .match({ user_id: user.id, completion_status: false });

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
                updated_at: new Date(goal.updated_at),
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

  const completeGoal = async (goal) => {
    completeItem(goal);
    setData((goals) => {
      return goals.filter((g) => g != goal);
    });
  };

  const deleteGoal = async (goal) => {
    deleteItem(goal);
    setData((goals) => {
      return goals.filter((g) => g != goal);
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
            <GoalList
              goal={item}
              deleteGoal={deleteGoal}
              completeGoal={completeGoal}
              navigation={navigation}
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
            style={styles.goalButton}
            onPress={() => {
              navigation.navigate("GoalSetter", {
                user: user,
                routeName: route.name,
                defaultType: "General",
              });
            }}
          >
            <FontAwesome name="plus" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export { orders, orderBys, sortItems, completeItem, deleteItem };
