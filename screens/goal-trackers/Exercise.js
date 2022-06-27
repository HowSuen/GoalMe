import React, { useEffect, useState } from "react";
import { Alert, View, FlatList, TouchableOpacity } from "react-native";
import { useIsFocused, useRoute } from "@react-navigation/native";
import styles from "./GoalTracker.style";
import { FontAwesome5 } from "@expo/vector-icons";
import Empty from "./Empty";
import supabase from "../../lib/supabase";
import SortButton from "../../components/goal-trackers/SortButton";
import { orders } from "./GoalTracker";

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
      let { data: modules, error } = await supabase
        .from("exercises")
        .select("*")
        .match({
          user_id: user.id,
          completion_status: false,
        });

      if (error) throw error;

      modules.sort(sortItems(order, orderBy)).reverse();

      setData([]);

      modules.map((exercise) => {
        setData((prevExercise) => {
          return [
            {
              id: exercise.id,
              exercise_name: exercise.exercise_name,
              description: exercise.description,
              time: exercise.time,
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

  //   const updateExperience = async (module) => {
  //     let addXP = 0;
  //     if (gradeReceived == "A+") {
  //       addXP = 2000;
  //     } else if (gradeReceived == "A") {
  //       addXP = 1900;
  //     } else if (gradeReceived == "A-") {
  //       addXP = 1800;
  //     } else if (gradeReceived == "B+") {
  //       addXP = 1700;
  //     } else if (gradeReceived == "B") {
  //       addXP = 1600;
  //     } else if (gradeReceived == "B-") {
  //       addXP = 1500;
  //     } else if (gradeReceived == "C+") {
  //       addXP = 1300;
  //     } else if (gradeReceived == "C") {
  //       addXP = 1100;
  //     } else if (gradeReceived == "C-") {
  //       addXP = 900;
  //     } else if (gradeReceived == "D+") {
  //       addXP = 600;
  //     } else if (gradeReceived == "D") {
  //       addXP = 400;
  //     } else if (gradeReceived == "F") {
  //       addXP = 200;
  //     } else if (gradeReceived == "F*") {
  //       addXP = 100;
  //     }

  //     addXP += compareGrade(module.targetGrade, gradeReceived) <= 0 ? 200 : 0;

  //     let newTotalXp = totalXp + addXP;
  //     let newWisdomXp = wisdomXp + addXP;
  //     let totalMax = Math.round(Math.pow(totalLvl / 0.05, 1.6));
  //     let wisdomMax = Math.round(Math.pow(wisdomLvl / 0.05, 1.6));

  //     let addLVL = 0;
  //     while (newTotalXp >= totalMax) {
  //       newTotalXp -= totalMax;
  //       addLVL += 1;
  //       totalMax = Math.round(Math.pow((totalLvl + addLVL) / 0.05, 1.6));
  //     }

  //     let addWisdomLVL = 0;
  //     while (newWisdomXp >= wisdomMax) {
  //       newWisdomXp -= wisdomMax;
  //       addWisdomLVL += 1;
  //       wisdomMax = Math.round(Math.pow((wisdomLvl + addWisdomLVL) / 0.05, 1.6));
  //     }

  //     setTotalXp(newTotalXp);
  //     setTotalLvl(totalLvl + addLVL);
  //     setWisdomXp(newWisdomXp);
  //     setWisdomLvl(wisdomLvl + addWisdomLVL);
  //     setCompleted(completed + 1);
  //     setCompletedAcad(completedAcad + 1);

  //     try {
  //       if (!user) throw new Error("No user on the session!");

  //       const updates = {
  //         id: user.id,
  //         updated_at: new Date().toISOString().toLocaleString(),
  //         totalXP: newTotalXp,
  //         totalLVL: totalLvl + addLVL,
  //         wisdomXP: newWisdomXp,
  //         wisdomLVL: wisdomLvl + addWisdomLVL,
  //         completed: completed + 1,
  //         completedAcad: completedAcad + 1,
  //       };

  //       let { error } = await supabase
  //         .from("experience")
  //         .upsert(updates, { returning: "minimal" });

  //       if (error) {
  //         throw error;
  //       }
  //     } catch (error) {
  //       Alert.alert(error.message);
  //     }
  //   };

  //   const completeModule = async (module) => {
  //     try {
  //       let { data, error } = await supabase
  //         .from("modules")
  //         .update({
  //           grade_received: gradeReceived,
  //           completion_status: true,
  //           completed_at: new Date().toISOString().toLocaleString(),
  //         })
  //         .match({ id: module.id });

  //       if (error) throw error;
  //     } catch (error) {
  //       Alert.alert(error.message);
  //     }

  //     updateExperience(module);

  //     setData((modules) => {
  //       return modules.filter((m) => m != module);
  //     });
  //   };

  //   const deleteModule = async (module) => {
  //     AlertPrompt({
  //       title: "Delete This Module?",
  //       description: "You can't undo this action.",
  //       proceedText: "Delete",
  //       onPress: async () => {
  //         try {
  //           let { error } = await supabase
  //             .from("modules")
  //             .delete()
  //             .match({ id: module.id });

  //           if (error) throw error;
  //         } catch (error) {
  //           Alert.alert(error.message);
  //         }
  //         setData((modules) => {
  //           return modules.filter((m) => m != module);
  //         });
  //       },
  //     });
  //   };

  return (
    <View style={styles.container}>
      <View>
        <FlatList
          data={[]}
          ListEmptyComponent={() => <Empty text={"No exercises added."} />}
          keyExtractor={(module) => module.id}
          //   renderItem={({ item }) => (
          //     <ModuleList
          //       module={item}
          //       deleteModule={deleteModule}
          //       completeModule={completeModule}
          //       onChangeText={(text) => setGradeReceived(text)}
          //       navigation={navigation}
          //     />
          //   )}
          showsVerticalScrollIndicator={false}
          onRefresh={() => {
            setIsFetching(true);
            // getModules();
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
