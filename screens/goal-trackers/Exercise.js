import React, { useEffect, useState } from "react";
import { Alert, View, FlatList, TouchableOpacity } from "react-native";
import { useIsFocused, useRoute } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { orders } from "./GoalTracker";
import styles from "./GoalTracker.style";
import Empty from "./Empty";
import supabase from "../../lib/supabase";
import SortButton from "../../components/goal-trackers/SortButton";
import ExerciseList from "../../components/goal-trackers/ExerciseList";


const orderBys = [
  { label: "Alphabetical", value: "alphabetical" },
  { label: "Volume", value: "volume" },
  { label: "Date Updated", value: "dateUpdated" },
];

const sortItems = (order, orderBy) => {
  const convertDate = (date) => {
    return new Date(date);
  };

  let comparator;
  if (orderBy == "volume") {
    comparator = (a, b) => {
      const s1 = a.volume;
      const s2 = b.volume;
      return order == "ascending" ? s1 - s2 : s2 - s1;
    };
  } else if (orderBy == "dateUpdated") {
    comparator = (a, b) =>
      order == "ascending"
        ? convertDate(a.updated_at) - convertDate(b.updated_at)
        : convertDate(b.updated_at) - convertDate(a.updated_at);
  } else if (orderBy == "alphabetical") {
    comparator = (a, b) => {
      const s1 = a.exercise_name;
      const s2 = b.exercise_name;
      return order == "ascending" ? s1.localeCompare(s2) : s2.localeCompare(s1);
    };
  }
  return comparator;
};

export default Exercise = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [order, setOrder] = useState("ascending");
  const [orderBy, setOrderBy] = useState("alphabetical");

  const [isFetching, setIsFetching] = useState(false);
  const user = supabase.auth.user();
  const isFocused = useIsFocused();
  const route = useRoute();
  const [state, setState] = useState({});

  const [totalXp, setTotalXp] = useState(0);
  const [strengthXp, setStrengthXp] = useState(0);
  const [totalLvl, setTotalLvl] = useState(1);
  const [strengthLvl, setStrengthLvl] = useState(1);
  const [completed, setCompleted] = useState(0);
  const [completedFit, setCompletedFit] = useState(0);

  useEffect(() => {
    getExercises();
    return () => {
      setState({});
    };
  }, [isFocused, totalXp]);

  const getExercises = async () => {
    try {
      let { data: exercises, error } = await supabase
        .from("exercises")
        .select("*")
        .match({
          user_id: user.id,
          completion_status: false,
        });
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
            },
            ...prevExercise,
          ];
        });
      });
    } catch (error) {
      Alert.alert(error.message);
    }
    getExperience();
  };

  const getExperience = async () => {
    try {
      if (!user) throw new Error("No user on the session!");

      let { data, error, status } = await supabase
        .from("experience")
        .select()
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setTotalXp(data.totalXP);
        setTotalLvl(data.totalLVL);
        setStrengthXp(data.strengthXP);
        setStrengthLvl(data.strengthLVL);
        setCompleted(data.completed);
        setCompletedFit(data.completedFit);
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const updateExperience = async (exercise) => {
    let addXP = 500; // temporary amount

    let newTotalXp = totalXp + addXP;
    let newStrengthXp = strengthXp + addXP;
    let totalMax = Math.round(Math.pow(totalLvl / 0.05, 1.6));
    let strengthMax = Math.round(Math.pow(strengthLvl / 0.05, 1.6));

    let addLVL = 0;
    while (newTotalXp >= totalMax) {
      newTotalXp -= totalMax;
      addLVL += 1;
      totalMax = Math.round(Math.pow((totalLvl + addLVL) / 0.05, 1.6));
    }

    let addStrengthLVL = 0;
    while (newStrengthXp >= strengthMax) {
      newStrengthXp -= strengthMax;
      addStrengthLVL += 1;
      strengthMax = Math.round(
        Math.pow((strengthLvl + addStrengthLVL) / 0.05, 1.6)
      );
    }

    setTotalXp(newTotalXp);
    setTotalLvl(totalLvl + addLVL);
    setStrengthXp(newStrengthXp);
    setStrengthLvl(strengthLvl + addStrengthLVL);
    setCompleted(completed + 1);
    setCompletedFit(completedFit + 1);

    try {
      if (!user) throw new Error("No user on the session!");

      const updates = {
        id: user.id,
        updated_at: new Date().toISOString().toLocaleString(),
        totalXP: newTotalXp,
        totalLVL: totalLvl + addLVL,
        strengthXP: newStrengthXp,
        strengthLVL: strengthLvl + addStrengthLVL,
        completed: completed + 1,
        completedFit: completedFit + 1,
      };

      let { error } = await supabase
        .from("experience")
        .upsert(updates, { returning: "minimal" });

      if (error) {
        throw error;
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const sortExercises = (order, orderBy) => {
    setData((exercises) => {
      return exercises.sort(sortItems(order, orderBy));
    });
  };

  const completeExercise = async (exercise) => {
    try {
      let { data, error } = await supabase
        .from("exercises")
        .update({
          completion_status: true,
          completed_at: new Date().toISOString().toLocaleString(),
        })
        .match({ id: exercise.id });

      if (error) throw error;
    } catch (error) {
      Alert.alert(error.message);
    }

    updateExperience(exercise);

    setData((exercises) => {
      return exercises.filter((e) => e != exercise);
    });
  };

  const deleteExercise = async (exercise) => {
    AlertPrompt({
      title: "Delete This Exercise?",
      description: "You can't undo this action.",
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

  return (
    <View style={styles.container}>
      <View>
        <FlatList
          data={[]}
          ListEmptyComponent={() => <Empty text={"No exercises added."} />}
          keyExtractor={(exercise) => exercise.id}
            // renderItem={({ item }) => (
            //   <ExerciseList
            //     module={item}
            //     deleteModule={deleteExercise}
            //     completeModule={completeExercise}
            //     navigation={navigation}
            //   />
            // )}
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
              //   sortModules(order, orderBy);
            }}
          />
          <SortButton
            value={order}
            items={orders}
            onValueChange={(order) => {
              setOrder(order);
              //   sortModules(order, orderBy);
            }}
          />
          <TouchableOpacity
            style={styles.exerciseButton}
            onPress={() => {
              navigation.navigate("ExerciseSetter", {
                user: user,
                routeName: route.name,
              });
            }}
          >
            <FontAwesome5 name="plus" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
