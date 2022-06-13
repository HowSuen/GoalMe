import React, { useEffect, useState } from "react";
import { Alert, View, FlatList, TouchableOpacity } from "react-native";
import styles from "./GoalTracker.style";
import { FontAwesome } from "@expo/vector-icons";
import GoalList from "../../components/goal-trackers/GoalList";
import Empty from "./Empty";
import supabase from "../../lib/supabase";
import { useIsFocused, useRoute } from "@react-navigation/native";
import SortButton from "../../components/goal-trackers/SortButton";

export default fitnessTracker = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [order, setOrder] = useState("descending");
  const [orderBy, setOrderBy] = useState("dateCreated");
  const user = supabase.auth.user();
  const isFocused = useIsFocused();
  const route = useRoute();

  const orders = [
    { label: "Ascending", value: "ascending" },
    { label: "Descending", value: "descending" },
  ];

  const orderBys = [
    { label: "Date Created", value: "dateCreated" },
    { label: "Date Updated", value: "dateUpdated" },
    { label: "Difficulty", value: "difficulty" },
  ];

  useEffect(() => {
    setData([]);
    (async () => {
      try {
        let { data: goals, error } = await supabase
          .from("goals")
          .select("*")
          .match({ user_id: user.id, type: "Fitness", completion_status: false });

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
                updated_at: goal.updated_at,
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
    if (orderBy == "dateCreated") {
      comparator = (a, b) =>
        order == "ascending" ? a.key - b.key : b.key - a.key;
    } else if (orderBy == "dateUpdated") {
      comparator = (a, b) =>
        order == "ascending" ? a.updated_at - b.updated_at : b.updated_at - a.updated_at;
    } 
    else if (orderBy == "difficulty") {
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

  const completeGoal = async (key) => {
    try {
      let { data, error } = await supabase
        .from("goals")
        .update({
          completion_status: true,
          completed_at: new Date().toISOString().toLocaleString(),
        })
        .match({ id: key });

      if (error) throw error;
    } catch (error) {
      Alert.alert(error.message);
    }

    setData((goals) => {
      return goals.filter((goal) => goal.key != key);
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
            value={order}
            items={orders}
            onValueChange={(order) => {
              setOrder(order);
              sortGoals(order, orderBy);
            }}
          />
          <TouchableOpacity
            style={styles.fitnessButton}
            onPress={() => {
              navigation.navigate("GoalSetter", {
                user: user,
                routeName: route.name,
                defaultType: "Fitness",
              });
            }}
          >
            <FontAwesome name="plus" size={20} color="black" />
          </TouchableOpacity>
          <SortButton
            value={orderBy}
            items={orderBys}
            onValueChange={(orderBy) => {
              setOrderBy(orderBy);
              sortGoals(order, orderBy);
            }}
          />
        </View>
      </View>
    </View>
  );
};
