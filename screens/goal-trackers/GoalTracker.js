import React, { useEffect, useState } from "react";
import { Alert, View, FlatList, TouchableOpacity } from "react-native";
import styles from "./GoalTracker.style";
import { FontAwesome5 } from "@expo/vector-icons";
import GoalList from "../../components/goal-trackers/GoalList";
import Empty from "../../components/goal-trackers/Empty";
import supabase from "../../lib/supabase";
import { useIsFocused, useRoute } from "@react-navigation/native";
import SortButton from "../../components/goal-trackers/SortButton";
import AlertPrompt from "../../components/goal-trackers/AlertPrompt";

const orders = [
  { label: "Ascending", value: "ascending" },
  { label: "Descending", value: "descending" },
];

const orderBys = [
  { label: "Date Created", value: "dateCreated" },
  { label: "Date Updated", value: "dateUpdated" },
  { label: "Difficulty", value: "difficulty" },
  { label: "Alphabetical", value: "alphabetical" },
];

const sortItems = (order, orderBy) => {
  const convertDiff = (difficulty) => {
    if (difficulty == "None") {
      return 0;
    } else if (difficulty == "Easy") {
      return 1;
    } else if (difficulty == "Medium") {
      return 2;
    } else {
      return 3;
    }
  };

  const convertType = (type) => {
    if (type == "General") {
      return 0;
    } else if (type == "Academic") {
      return 1;
    } else if (type == "Fitness") {
      return 2;
    } else {
      return 3;
    }
  };

  const convertDate = (date) => {
    return new Date(date);
  };

  let comparator;
  if (orderBy == "dateCreated") {
    comparator = (a, b) => {
      return order == "ascending" ? a.id - b.id : b.id - a.id;
    };
  } else if (orderBy == "dateUpdated") {
    comparator = (a, b) =>
      order == "ascending"
        ? convertDate(a.updated_at) - convertDate(b.updated_at)
        : convertDate(b.updated_at) - convertDate(a.updated_at);
  } else if (orderBy == "dateCompleted") {
    comparator = (a, b) =>
      order == "ascending"
        ? convertDate(a.completed_at) - convertDate(b.completed_at)
        : convertDate(b.completed_at) - convertDate(a.completed_at);
  } else if (orderBy == "difficulty") {
    comparator = (a, b) =>
      order == "ascending"
        ? convertDiff(a.difficulty) - convertDiff(b.difficulty)
        : convertDiff(b.difficulty) - convertDiff(a.difficulty);
  } else if (orderBy == "type") {
    comparator = (a, b) =>
      order == "ascending"
        ? convertType(a.type) - convertType(b.type)
        : convertType(b.type) - convertType(a.type);
  } else if (orderBy == "alphabetical") {
    comparator = (a, b) =>
      order == "ascending"
        ? a.content.localeCompare(b.content)
        : b.content.localeCompare(a.content);
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
      .match({ id: item.id });

    if (error) throw error;

    const userId = data[0].user_id;

    if (item.recurring) {
      let { data, error } = await supabase.from("goals").insert([
        {
          user_id: userId,
          content: item.content,
          description: item.description,
          type: item.type,
          module: item.module,
          difficulty: item.difficulty,
          recurring: item.recurring,
        },
      ]);

      if (error) throw error;

      return data[0];
    }
  } catch (error) {
    Alert.alert(error.message);
  }
};

const deleteItem = async (item) => {
  try {
    let { data, error } = await supabase
      .from("goals")
      .delete()
      .match({ id: item.id });

    if (error) throw error;
  } catch (error) {
    Alert.alert(error.message);
  }
};

export default GoalTracker = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [order, setOrder] = useState("ascending");
  const [orderBy, setOrderBy] = useState("dateCreated");
  const [isFetching, setIsFetching] = useState(false);
  const user = supabase.auth.user();
  const isFocused = useIsFocused();
  const route = useRoute();
  const [state, setState] = useState({});

  const [totalXp, setTotalXp] = useState(0);
  const [wisdomXp, setWisdomXp] = useState(0);
  const [strengthXp, setStrengthXp] = useState(0);
  const [wealthXp, setWealthXp] = useState(0);

  const [totalLvl, setTotalLvl] = useState(1);
  const [strengthLvl, setStrengthLvl] = useState(1);
  const [wisdomLvl, setWisdomLvl] = useState(1);
  const [wealthLvl, setWealthLvl] = useState(1);
  const [completed, setCompleted] = useState(0);
  const [completedAcad, setCompletedAcad] = useState(0);
  const [completedFit, setCompletedFit] = useState(0);
  const [completedFinance, setCompletedFinance] = useState(0);

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
        .match({ user_id: user.id, completion_status: false });

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
              module: goal.module,
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
        setWisdomXp(data.wisdomXP);
        setWisdomLvl(data.wisdomLVL);
        setStrengthXp(data.strengthXP);
        setStrengthLvl(data.strengthLVL);
        setWealthXp(data.wealthXP);
        setWealthLvl(data.wealthLVL);
        setCompleted(data.completed);
        setCompletedAcad(data.completedAcad);
        setCompletedFit(data.completedFit);
        setCompletedFinance(data.completedFinance);
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

    let newWisdomXp = wisdomXp;
    let newStrengthXp = strengthXp;
    let newWealthXp = wealthXp;

    if (goal.type == "Academic") {
      newWisdomXp += addXP;
    } else if (goal.type == "Fitness") {
      newStrengthXp += addXP;
    } else if (goal.type == "Finance") {
      newWealthXp += addXP;
    }

    let newTotalXp = totalXp + addXP;
    let totalMax = Math.round(Math.pow(totalLvl / 0.05, 1.6));
    let wisdomMax = Math.round(Math.pow(wisdomLvl / 0.05, 1.6));
    let strengthMax = Math.round(Math.pow(strengthLvl / 0.05, 1.6));
    let wealthMax = Math.round(Math.pow(wealthLvl / 0.05, 1.6));

    let addLVL = 0;
    while (newTotalXp >= totalMax) {
      newTotalXp -= totalMax;
      addLVL += 1;
      totalMax = Math.round(Math.pow((totalLvl + addLVL) / 0.05, 1.6));
    }

    let addWisdomLVL = 0;
    while (newWisdomXp >= wisdomMax) {
      newWisdomXp -= wisdomMax;
      addWisdomLVL += 1;
      wisdomMax = Math.round(Math.pow((wisdomLvl + addWisdomLVL) / 0.05, 1.6));
    }

    let addStrengthLVL = 0;
    while (newStrengthXp >= strengthMax) {
      newStrengthXp -= strengthMax;
      addStrengthLVL += 1;
      strengthMax = Math.round(
        Math.pow((strengthLvl + addStrengthLVL) / 0.05, 1.6)
      );
    }

    let addWealthLVL = 0;
    while (newWealthXp >= wealthMax) {
      newWealthXp -= wealthMax;
      addWealthLVL += 1;
      wealthMax = Math.round(Math.pow((wealthLvl + addWealthLVL) / 0.05, 1.6));
    }

    setTotalXp(newTotalXp);
    setTotalLvl(totalLvl + addLVL);
    setWisdomXp(newWisdomXp);
    setWisdomLvl(wisdomLvl + addWisdomLVL);
    setStrengthXp(newStrengthXp);
    setStrengthLvl(strengthLvl + addStrengthLVL);
    setWealthXp(newWealthXp);
    setWealthLvl(wealthLvl + addWealthLVL);
    setCompleted(completed + 1);
    setCompletedAcad(goal.type == "Academic" ? completedAcad + 1 : completedAcad);
    setCompletedFit(goal.type == "Fitness" ? completedFit + 1 : completedFit);
    setCompletedFinance(goal.type == "Finance" ? completedFinance + 1 : completedFinance);

    try {
      const user = supabase.auth.user();
      if (!user) throw new Error("No user on the session!");

      const updates = {
        id: user.id,
        updated_at: new Date().toISOString().toLocaleString(),
        totalXP: newTotalXp,
        totalLVL: totalLvl + addLVL,
        wisdomXP: newWisdomXp,
        wisdomLVL: wisdomLvl + addWisdomLVL,
        strengthXP: newStrengthXp,
        strengthLVL: strengthLvl + addStrengthLVL,
        wealthXP: newWealthXp,
        wealthLVL: wealthLvl + addWealthLVL,
        completed: completed + 1,
        completedAcad: goal.type == "Academic" ? completedAcad + 1 : completedAcad,
        completedFit: goal.type == "Fitness" ? completedFit + 1 : completedFit,
        completedFinance: goal.type == "Finance" ? completedFinance + 1 : completedFinance,
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
        const recurringGoal = completeItem(goal)
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
            style={styles.goalButton}
            onPress={() => {
              navigation.navigate("GoalSetter", {
                user: user,
                routeName: route.name,
                defaultType: "General",
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

export { orders, orderBys, sortItems, completeItem, deleteItem };
