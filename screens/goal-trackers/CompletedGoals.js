import React, { useEffect, useState } from "react";
import { Alert, View, FlatList, ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import styles from "./CompletedGoals.style";
import CompletedList from "../../components/goal-trackers/CompletedList";
import Empty from "../../components/goal-trackers/Empty";
import supabase from "../../lib/supabase";
import { orders, sortItems, deleteItem } from "./GoalTracker";
import AlertPrompt from "../../components/goal-trackers/AlertPrompt";
import { Text, Image } from "react-native-elements";
import Loading from "../../components/goal-trackers/Loading";

const orderBys = [
  { label: "Date Completed", value: "dateCompleted" },
  { label: "Difficulty", value: "difficulty" },
  { label: "Type", value: "type" },
];

const redoItem = async (item) => {
  try {
    let { data, error } = await supabase
      .from("goals")
      .update({ completion_status: false, completed_at: null })
      .match({ id: item.id });

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

export default CompletedGoals = ({ navigation }) => {
  const user = supabase.auth.user();
  const [data, setData] = useState([]);
  const [order, setOrder] = useState("ascending");
  const [orderBy, setOrderBy] = useState("dateCompleted");
  const [isFetching, setIsFetching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({});

  useEffect(() => {
    getGoals();
    return () => {
      setState({});
    };
  }, []);

  const getGoals = async () => {
    setLoading(true);
    try {
      let { data: goals, error } = await supabase
        .from("goals")
        .select("*")
        .match({ user_id: user.id, completion_status: true });

      if (error) throw error;

      goals.sort(sortItems(order, orderBy)).reverse();

      setData([]);

      goals.map((goal) => {
        setData((prevGoal) => {
          return [
            {
              id: goal.id,
              content: goal.content,
              description: goal.description,
              type: goal.type,
              difficulty: goal.difficulty,
              module: goal.module,
              recurring: goal.recurring,
              completed_at: goal.completed_at,
            },
            ...prevGoal,
          ];
        });
      });
    } catch (error) {
      Alert.alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const sortGoals = (order, orderBy) => {
    setData((goals) => {
      return goals.sort(sortItems(order, orderBy));
    });
  };

  const deleteGoal = async (goal) => {
    AlertPrompt({
      title: "Delete This Goal?",
      description:
        "Doing so will remove its data from 'Daily Goals' in Progress. You can't undo this action.",
      proceedText: "Delete",
      onPress: async () => {
        deleteItem(goal);
        setData((goals) => {
          return goals.filter((g) => g != goal);
        });
      },
    });
  };

  const redoGoal = async (goal) => {
    AlertPrompt({
      title: "Redo This Goal?",
      description:
        "Doing so will remove its data from 'Daily Goals' in Progress. You can't undo this action.",
      proceedText: "Redo",
      onPress: async () => {
        redoItem(goal);
        setData((goals) => {
          return goals.filter((g) => g != goal);
        });
      },
    });
  };

  const deleteAllGoals = async () => {
    AlertPrompt({
      title: "Delete All Completed Goals?",
      description:
        "Doing so will remove all goal data from 'Daily Goals' in Progress. You can't undo this action.",
      proceedText: "Delete",
      onPress: async () => {
        deleteAllItems();
        setData([]);
      },
    });
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("CompletedModules");
            }}
            style={styles.moduleNavButton}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {/* <Image
                style={{ width: 30, height: 28 }}
                source={require("../../assets/modules-progress.png")}
                resizeMode="contain"
              /> */}
              <Text style={styles.buttonText}>Modules</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("CompletedExercises");
            }}
            style={styles.exerciseNavButton}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {/* <Image
                style={{ width: 30, height: 28 }}
                source={require("../../assets/exercises-progress.png")}
                resizeMode="contain"
              /> */}
              <Text style={styles.buttonText}>Exercises</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("CompletedSavings");
            }}
            style={styles.walletNavButton}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {/* <Image
                style={{ width: 30, height: 28 }}
                source={require("../../assets/exercises-progress.png")}
                resizeMode="contain"
              /> */}
              <Text style={styles.buttonText}>Savings</Text>
            </View>
          </TouchableOpacity>
        </View>
        {loading ? (
          <FlatList
            data={[]}
            ListEmptyComponent={() => <Loading />}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <FlatList
            data={data}
            ListEmptyComponent={() => <Empty text={"No goals completed."} />}
            keyExtractor={(goal) => goal.id}
            renderItem={({ item }) => (
              <CompletedList
                goal={item}
                deleteGoal={deleteGoal}
                redoGoal={() => {}}
              />
            )}
            showsVerticalScrollIndicator={false}
            onRefresh={() => {
              setIsFetching(true);
              getGoals();
              setIsFetching(false);
            }}
            refreshing={isFetching}
          />
        )}
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
            <Ionicons name="trash" size={25} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
