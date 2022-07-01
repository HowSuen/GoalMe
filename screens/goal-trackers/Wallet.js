import React, { useEffect, useState } from "react";
import {
  Alert,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
} from "react-native";
import { useIsFocused, useRoute } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { orders } from "./GoalTracker";
import styles from "./Wallet.style";
import Empty from "./Empty";
import supabase from "../../lib/supabase";
import SortButton from "../../components/goal-trackers/SortButton";
// import ExerciseList from "../../components/goal-trackers/ExerciseList";
import AlertPrompt from "../../components/goal-trackers/AlertPrompt";
import { Card } from "react-native-elements";

const orderBys = [
  { label: "Alphabetical", value: "alphabetical" },
  //   { label: "Type", value: "type" },
  { label: "Date Updated", value: "dateUpdated" },
];

// const sortItems = (order, orderBy) => {
//   const convertDate = (date) => {
//     return new Date(date);
//   };

//   let comparator;
//   if (orderBy == "type") {
//     comparator = (a, b) => {
//       const s1 = a.type;
//       const s2 = b.type;
//       return order == "ascending" ? s1.localeCompare(s2) : s2.localeCompare(s1);
//     };
//   } else if (orderBy == "dateUpdated") {
//     comparator = (a, b) =>
//       order == "ascending"
//         ? convertDate(a.updated_at) - convertDate(b.updated_at)
//         : convertDate(b.updated_at) - convertDate(a.updated_at);
//   } else if (orderBy == "alphabetical") {
//     comparator = (a, b) => {
//       const s1 = a.exercise_name;
//       const s2 = b.exercise_name;
//       return order == "ascending" ? s1.localeCompare(s2) : s2.localeCompare(s1);
//     };
//   }
//   return comparator;
// };

export default Wallet = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [order, setOrder] = useState("ascending");
  const [orderBy, setOrderBy] = useState("alphabetical");

  const [isFetching, setIsFetching] = useState(false);
  const user = supabase.auth.user();
  const isFocused = useIsFocused();
  const route = useRoute();
  const [state, setState] = useState({});

  const [totalXp, setTotalXp] = useState(0);
  const [wealthXp, setWealthXp] = useState(0);
  const [totalLvl, setTotalLvl] = useState(1);
  const [wealthLvl, setWealthLvl] = useState(1);
  const [completed, setCompleted] = useState(0);
  const [completedFinance, setCompletedFinance] = useState(0);

  useEffect(() => {
    // getExercises();
    return () => {
      setState({});
    };
  }, [isFocused, totalXp]);

  //   const getExercises = async () => {
  //     try {
  //       let { data: exercises, error } = await supabase
  //         .from("exercises")
  //         .select("*")
  //         .match({
  //           user_id: user.id,
  //           completion_status: false,
  //         });
  //       if (error) throw error;

  //       exercises.sort(sortItems(order, orderBy)).reverse();

  //       setData([]);

  //       exercises.map((exercise) => {
  //         setData((prevExercise) => {
  //           return [
  //             {
  //               id: exercise.id,
  //               type: exercise.type,
  //               exercise_name: exercise.exercise_name,
  //               description: exercise.description,
  //               distance: exercise.distance,
  //               min: exercise.min,
  //               sec: exercise.sec,
  //               weight: exercise.weight,
  //               rep: exercise.rep,
  //               set: exercise.set,
  //               volume: exercise.volume,
  //               updated_at: exercise.updated_at,
  //               recurring: exercise.recurring,
  //             },
  //             ...prevExercise,
  //           ];
  //         });
  //       });
  //     } catch (error) {
  //       Alert.alert(error.message);
  //     }
  //     getExperience();
  //   };

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
        setWealthXp(data.wealthXP);
        setWealthLvl(data.wealthLVL);
        setCompleted(data.completed);
        setCompletedFinance(data.completedFinance);
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  //   const updateExperience = async (exercise) => {
  //     let addXP = 500; // temporary amount

  //     let newTotalXp = totalXp + addXP;
  //     let newStrengthXp = strengthXp + addXP;
  //     let totalMax = Math.round(Math.pow(totalLvl / 0.05, 1.6));
  //     let strengthMax = Math.round(Math.pow(strengthLvl / 0.05, 1.6));

  //     let addLVL = 0;
  //     while (newTotalXp >= totalMax) {
  //       newTotalXp -= totalMax;
  //       addLVL += 1;
  //       totalMax = Math.round(Math.pow((totalLvl + addLVL) / 0.05, 1.6));
  //     }

  //     let addStrengthLVL = 0;
  //     while (newStrengthXp >= strengthMax) {
  //       newStrengthXp -= strengthMax;
  //       addStrengthLVL += 1;
  //       strengthMax = Math.round(
  //         Math.pow((strengthLvl + addStrengthLVL) / 0.05, 1.6)
  //       );
  //     }

  //     setTotalXp(newTotalXp);
  //     setTotalLvl(totalLvl + addLVL);
  //     setStrengthXp(newStrengthXp);
  //     setStrengthLvl(strengthLvl + addStrengthLVL);
  //     setCompleted(completed + 1);
  //     setCompletedFit(completedFit + 1);

  //     try {
  //       if (!user) throw new Error("No user on the session!");

  //       const updates = {
  //         id: user.id,
  //         updated_at: new Date().toISOString().toLocaleString(),
  //         totalXP: newTotalXp,
  //         totalLVL: totalLvl + addLVL,
  //         strengthXP: newStrengthXp,
  //         strengthLVL: strengthLvl + addStrengthLVL,
  //         completed: completed + 1,
  //         completedFit: completedFit + 1,
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

  //   const sortExercises = (order, orderBy) => {
  //     setData((exercises) => {
  //       return exercises.sort(sortItems(order, orderBy));
  //     });
  //   };

  //   const completeItem = async (exercise) => {
  //     try {
  //       let { data, error } = await supabase
  //         .from("exercises")
  //         .update({
  //           completion_status: true,
  //           completed_at: new Date().toISOString().toLocaleString(),
  //         })
  //         .match({ id: exercise.id });

  //       if (error) throw error;

  //       const userId = data[0].user_id;

  //       if (exercise.recurring) {
  //         let { data, error } = await supabase.from("exercises").insert([
  //           {
  //             user_id: userId,
  //             type: exercise.type,
  //             exercise_name: exercise.exercise_name,
  //             description: exercise.description,
  //             distance: exercise.distance,
  //             min: exercise.min,
  //             sec: exercise.sec,
  //             weight: exercise.weight,
  //             rep: exercise.rep,
  //             set: exercise.set,
  //             volume: exercise.volume,
  //             recurring: exercise.recurring,
  //           },
  //         ]);

  //         if (error) throw error;

  //         return data[0];
  //       }
  //     } catch (error) {
  //       Alert.alert(error.message);
  //     }
  //   };

  //   const completeExercise = async (exercise) => {
  //     AlertPrompt({
  //       title: "Complete this Exercise?",
  //       proceedText: "Complete",
  //       onPress: () => {
  //         const recurringExercise = completeItem(exercise);
  //         if (exercise.recurring) {
  //           recurringExercise.then(() => getExercises());
  //         } else {
  //           setData((exercises) => {
  //             return exercises.filter((e) => e != exercise);
  //           });
  //         }
  //         updateExperience(exercise);
  //       },
  //     });
  //   };

  //   const deleteExercise = async (exercise) => {
  //     AlertPrompt({
  //       title: "Delete This Exercise?",
  //       description: "You can't undo this action.",
  //       proceedText: "Delete",
  //       onPress: async () => {
  //         try {
  //           let { error } = await supabase
  //             .from("exercises")
  //             .delete()
  //             .match({ id: exercise.id });

  //           if (error) throw error;
  //         } catch (error) {
  //           Alert.alert(error.message);
  //         }
  //         setData((exercises) => {
  //           return exercises.filter((e) => e != exercise);
  //         });
  //       },
  //     });
  //   };

  //   return (
  // <View style={styles.container}>
  //   {/* <View>
  //     <Card containerStyle={{ marginTop: 200, position: "relative", padding: 5 }}>
  //       <Image
  //         style={styles.emptyImage}
  //         source={require("../../assets/money_jar.png")}
  //       />
  //     </Card>
  //   </View> */}
  //   <TouchableOpacity
  //     onPress={() => {
  //       navigation.navigate("Wallet");
  //     }}
  //     style={styles.walletNavButton}
  //   >
  //     <Text style={styles.buttonText}>Wallet</Text>
  //   </TouchableOpacity>
  //   <View>
  //     <FlatList
  //       data={[]}
  //       ListEmptyComponent={() => (
  //         <View style={styles.emptyContainer}>
  //           <Image
  //             style={styles.emptyImage}
  //             source={require("../../assets/bankrupt.png")}
  //           />
  //           <Text style={styles.emptyText}>No wallet history</Text>
  //         </View>
  //       )}
  //       keyExtractor={(wallet) => wallet.id}
  //       //   renderItem={({ item }) => (
  //       //     <ExerciseList
  //       //       exercise={item}
  //       //       deleteExercise={deleteExercise}
  //       //       completeExercise={completeExercise}
  //       //       navigation={navigation}
  //       //     />
  //       //   )}
  //       showsVerticalScrollIndicator={false}
  //       onRefresh={() => {
  //         setIsFetching(true);
  //         // getExercises();
  //         setIsFetching(false);
  //       }}
  //       refreshing={isFetching}
  //     />
  //   </View>
  // </View>

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.walletContainer}>
          <Image
            style={styles.walletImage}
            source={require("../../assets/money_jar.png")}
          />
        </View>
        <FlatList
        //   style={{backgroundColor: "red"}}
          data={data}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Image
                style={styles.emptyImage}
                source={require("../../assets/bankrupt.png")}
              />
              <Text style={styles.emptyText}>No wallet history</Text>
            </View>
          )}
          keyExtractor={(exercise) => exercise.id}
          renderItem={({ item }) => (
            <ExerciseList
              exercise={item}
              deleteExercise={deleteExercise}
              completeExercise={completeExercise}
              navigation={navigation}
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
        {/* <View style={styles.bottomContainer}>
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
            style={styles.walletButton}
            onPress={() => {
              navigation.navigate("ExerciseSetter", {
                user: user,
                routeName: route.name,
              });
            }}
          >
            <FontAwesome5 name="plus" size={20} color="black" />
          </TouchableOpacity>
        </View> */}
      </View>
    </View>
  );
};
