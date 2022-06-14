import React, { useEffect, useState } from "react";
import { Alert, View, FlatList, TouchableOpacity } from "react-native";
import styles from "./GoalTracker.style";
import { FontAwesome } from "@expo/vector-icons";
import GoalList from "../../components/goal-trackers/GoalList";
import Empty from "./Empty";
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

export default AcademicTracker = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [order, setOrder] = useState("ascending");
  const [orderBy, setOrderBy] = useState("dateCreated");
  const user = supabase.auth.user();
  const isFocused = useIsFocused();
  const route = useRoute();

  const [totalXp, setTotalXp] = useState(0);
  const [wisdomXp, setWisdomXp] = useState(0);
  const [strengthXp, setStrengthXp] = useState(0);
  const [wealthXp, setWealthXp] = useState(0);

  const [totalLvl, setTotalLvl] = useState(1);
  const [strengthLvl, setStrengthLvl] = useState(1);
  const [wisdomLvl, setWisdomLvl] = useState(1);
  const [wealthLvl, setWealthLvl] = useState(1);

  useEffect(() => {
    setData([]);
    getGoals();
  }, [isFocused, totalXp]);

  const getGoals = async () => {
    try {
      let { data: goals, error } = await supabase
        .from("goals")
        .select("*")
        .match({
          user_id: user.id,
          type: "Academic",
          completion_status: false,
        });

      if (error) throw error;

      goals.sort(sortItems(order, orderBy)).reverse();

      goals.map((goal) => {
        setData((prevGoal) => {
          return [
            {
              id: goal.id,
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
    const newTotalXp = totalXp + addXP;
    const newWisdomXp = wisdomXp + addXP;
    const totalMax = Math.round(Math.pow(totalLvl / 0.07, 2));
    const wisdomMax = Math.round(Math.pow(wisdomLvl / 0.07, 2));

    try {
      const user = supabase.auth.user();
      if (!user) throw new Error("No user on the session!");

      const updates = {
        id: user.id,
        updated_at: new Date().toISOString().toLocaleString(),
        totalXP: newTotalXp >= totalMax ? newTotalXp % totalMax : newTotalXp,
        totalLVL: newTotalXp >= totalMax ? totalLvl + 1 : totalLvl,
        wisdomXP:
          newWisdomXp >= wisdomMax ? newWisdomXp % wisdomMax : newWisdomXp,
        wisdomLVL: newWisdomXp >= wisdomMax ? wisdomLvl + 1 : wisdomLvl,
        strengthXP: strengthXp,
        strengthLVL: strengthLvl,
        wealthXP: wealthXp,
        wealthLVL: wealthLvl,
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
    setData((goals) => {
      return goals.sort(sortItems(order, orderBy));
    });
  };

  const completeGoal = async (goal) => {
    completeItem(goal);
    setData((goals) => {
      return goals.filter((g) => g != goal);
    });
    updateExperience(goal);
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
          keyExtractor={(goal) => goal.id}
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
            style={styles.academicButton}
            onPress={() => {
              navigation.navigate("GoalSetter", {
                user: user,
                routeName: route.name,
                defaultType: "Academic",
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
