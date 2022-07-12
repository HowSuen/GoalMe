import React, { useEffect, useState } from "react";
import { Alert, View, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import styles from "./CompletedGoals.style";
import supabase from "../../lib/supabase";
import { orders } from "./GoalTracker";
import { sortItems } from "./Exercise";
import AlertPrompt from "../../components/goal-trackers/AlertPrompt";
import CompletedExerciseList from "../../components/goal-trackers/CompletedExerciseList";
import { Image, Text } from "react-native-elements";

const orderBys = [
  { label: "Date Completed", value: "dateCompleted" },
  { label: "Type", value: "type" },
  { label: "Alphabetical", value: "alphabetical" },
];

const redoItem = async (item) => {
  try {
    let { data, error } = await supabase
      .from("exercises")
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
      .from("exercises")
      .delete()
      .match({ completion_status: true });

    if (error) throw error;
  } catch (error) {
    Alert.alert(error.message);
  }
};

export default CompletedExercises = () => {
  const [data, setData] = useState([]);
  const [order, setOrder] = useState("ascending");
  const [orderBy, setOrderBy] = useState("dateCompleted");
  const [isFetching, setIsFetching] = useState(false);
  const user = supabase.auth.user();
  const [state, setState] = useState({});

  useEffect(() => {
    getExercises();
    return () => {
      setState({});
    };
  }, []);

  const getExercises = async () => {
    try {
      let { data: exercises, error } = await supabase
        .from("exercises")
        .select("*")
        .match({ user_id: user.id, completion_status: true });

      if (error) throw error;

      exercises.sort(sortItems(order, orderBy)).reverse();

      setData([]);

      exercises.map((exercise) => {
        setData((prevExercise) => {
          return [
            {
              id: exercise.id,
              type: exercise.type,
              exercise_name: exercise.exercise_name,
              description: exercise.description,
              distance: exercise.distance,
              min: exercise.min,
              sec: exercise.sec,
              weight: exercise.weight,
              rep: exercise.rep,
              set: exercise.set,
              volume: exercise.volume,
              updated_at: exercise.updated_at,
              recurring: exercise.recurring,
              completed_at: exercise.completed_at,
            },
            ...prevExercise,
          ];
        });
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const sortExercises = (order, orderBy) => {
    setData((exercises) => {
      return exercises.sort(sortItems(order, orderBy));
    });
  };

  const deleteExercise = async (exercise) => {
    AlertPrompt({
      title: "Delete This Exercise?",
      description:
        "Doing so will remove its data from 'Daily Exercises' and 'Daily Goals' in Progress Checker.\nYou can't undo this action.",
      proceedText: "Delete",
      onPress: async () => {
        try {
          let { error } = await supabase
            .from("exercises")
            .delete()
            .match({ id: exercise.id });

          if (error) throw error;
        } catch (error) {
          Alert.alert(error.message);
        }
        setData((exercises) => {
          return exercises.filter((e) => e != exercise);
        });
      },
    });
  };

  const redoExercise = async (exercise) => {
    AlertPrompt({
      title: "Redo This Exercise?",
      description:
        "Doing so will remove its data from 'Daily Exercises' and 'Daily Goals' in Progress Checker.\nYou can't undo this action.",
      proceedText: "Redo",
      onPress: async () => {
        redoItem(exercise);
        setData((exercises) => {
          return exercises.filter((e) => e != exercise);
        });
      },
    });
  };

  const deleteAllExercises = async () => {
    AlertPrompt({
      title: "Delete All Completed Exercises?",
      description:
        "Doing so will remove all exercise data from 'Daily Exercises' and 'Daily Goals' in Progress Checker.\nYou can't undo this action.",
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
        <FlatList
          data={data}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Image
                style={styles.emptyImage}
                source={require("../../assets/dumbbells.png")}
              />
              <Text style={styles.emptyText}>No exercises completed.</Text>
            </View>
          )}
          keyExtractor={(exercise) => exercise.id}
          renderItem={({ item }) => (
            <CompletedExerciseList
              exercise={item}
              deleteExercise={deleteExercise}
              redoExercise={() => {}}
            />
          )}
          showsVerticalScrollIndicator={false}
          onRefresh={() => {
            setIsFetching(true);
            getExercises();
            setIsFetching(false);
          }}
          refreshing={isFetching}
        />
        <View style={styles.bottomContainer}>
          <SortButton
            value={orderBy}
            items={orderBys}
            onValueChange={(orderBy) => {
              setOrderBy(orderBy);
              sortExercises(order, orderBy);
            }}
          />
          <SortButton
            value={order}
            items={orders}
            onValueChange={(order) => {
              setOrder(order);
              sortExercises(order, orderBy);
            }}
          />
          <TouchableOpacity
            style={styles.exerciseButton}
            onPress={deleteAllExercises}
          >
            <Ionicons name="trash" size={25} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
