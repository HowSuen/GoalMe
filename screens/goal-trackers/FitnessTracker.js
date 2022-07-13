import React, { useEffect, useState } from "react";
import { Alert, View, FlatList, TouchableOpacity, Text } from "react-native";
import styles from "./GoalTracker.style";
import { FontAwesome5 } from "@expo/vector-icons";
import GoalList from "../../components/goal-trackers/GoalList";
import Empty from "../../components/goal-trackers/Empty";
import supabase from "../../lib/supabase";
import { useIsFocused, useRoute } from "@react-navigation/native";
import SortButton from "../../components/goal-trackers/SortButton";
import {
  orders,
  orderBys,
  sortItems,
  completeItem,
  deleteItem,
} from "./GoalTracker";
import AlertPrompt from "../../components/goal-trackers/AlertPrompt";
import { Image } from "react-native-elements";

export default fitnessTracker = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [order, setOrder] = useState("ascending");
  const [orderBy, setOrderBy] = useState("dateCreated");
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
    getGoals();
    return () => {
      setState({});
    };
  }, [isFocused, totalXp]);

  const getGoals = async () => {
    try {
      let { data: goals, error } = await supabase
        .from("goals")
        .select("*")
        .match({
          user_id: user.id,
          type: "Fitness",
          completion_status: false,
        });

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
              recurring: goal.recurring,
              updated_at: goal.updated_at,
            },
            ...prevGoal,
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

  const updateExperience = async (goal) => {
    let addXP = 0;
    if (goal.difficulty == "Hard") {
      addXP = 200;
    } else if (goal.difficulty == "Medium") {
      addXP = 100;
    } else if (goal.difficulty == "Easy") {
      addXP = 50;
    }

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

  const sortGoals = (order, orderBy) => {
    setData((goals) => goals.sort(sortItems(order, orderBy)));
  };

  const completeGoal = async (goal) => {
    AlertPrompt({
      title: "Complete This Goal?",
      proceedText: "Complete",
      onPress: async () => {
        const recurringGoal = completeItem(goal);
        if (goal.recurring) {
          recurringGoal.then(() => getGoals());
        } else {
          setData((goals) => goals.filter((g) => g != goal));
        }
        updateExperience(goal);
      },
    });
  };

  const deleteGoal = async (goal) => {
    AlertPrompt({
      title: "Delete This Goal?",
      description: "You can't undo this action.",
      proceedText: "Delete",
      onPress: async () => {
        deleteItem(goal);
        setData((goals) => goals.filter((g) => g != goal));
      },
    });
  };

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Exercise");
          }}
          style={styles.exerciseNavButton}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              style={{ width: 30, height: 28 }}
              source={require("../../assets/exercises-progress.png")}
              resizeMode="contain"
            />
            <Text style={styles.buttonText}>Exercises</Text>
          </View>
        </TouchableOpacity>
        <FlatList
          data={data}
          ListEmptyComponent={() => <Empty />}
          keyExtractor={(goal) => goal.id}
          renderItem={({ item }) => (
            <GoalList
              goal={item}
              deleteGoal={deleteGoal}
              completeGoal={completeGoal}
              navigation={navigation}
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
            style={styles.fitnessButton}
            onPress={() => {
              navigation.navigate("GoalSetter", {
                user: user,
                routeName: route.name,
                defaultType: "Fitness",
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
