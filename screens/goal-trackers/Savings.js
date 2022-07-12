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
import styles from "./Savings.style";
import supabase from "../../lib/supabase";
import SortButton from "../../components/goal-trackers/SortButton";
import AlertPrompt from "../../components/goal-trackers/AlertPrompt";
import SavingList from "../../components/goal-trackers/SavingList";

const orderBys = [
  { label: "Date Created", value: "dateCreated" },
  { label: "Date Updated", value: "dateUpdated" },
  { label: "Saving Target ($)", value: "savingTarget" },
  { label: "Current Savings (%)", value: "currentSavings" },
  { label: "Alphabetical", value: "alphabetical" },
  //   { label: "Type", value: "type" },
];

const sortItems = (order, orderBy) => {
  const convertDate = (date) => {
    return new Date(date);
  };

  let comparator;
  // if (orderBy == "type") {
  //   comparator = (a, b) => {
  //     const s1 = a.type;
  //     const s2 = b.type;
  //     return order == "ascending" ? s1.localeCompare(s2) : s2.localeCompare(s1);
  //   };
  // } else
  if (orderBy == "dateCreated") {
    comparator = (a, b) => {
      return order == "ascending" ? a.id - b.id : b.id - a.id;
    };
  } else if (orderBy == "dateUpdated") {
    comparator = (a, b) =>
      order == "ascending"
        ? convertDate(a.updated_at) - convertDate(b.updated_at)
        : convertDate(b.updated_at) - convertDate(a.updated_at);
  } else if (orderBy == "alphabetical") {
    comparator = (a, b) => {
      const s1 = a.name;
      const s2 = b.name;
      return order == "ascending" ? s1.localeCompare(s2) : s2.localeCompare(s1);
    };
  } else if (orderBy == "savingTarget") {
    comparator = (a, b) => {
      return order == "ascending" ? a.amount - b.amount : b.amount - a.amount;
    };
  } else if (orderBy == "currentSavings") {
    comparator = (a, b) => {
      return order == "ascending"
        ? a.curr_amount / a.amount - b.curr_amount / b.amount
        : b.curr_amount / b.amount - a.curr_amount / a.amount;
    };
  } else if (orderBy == "dateCompleted") {
    comparator = (a, b) =>
      order == "ascending"
        ? convertDate(a.completed_at) - convertDate(b.completed_at)
        : convertDate(b.completed_at) - convertDate(a.completed_at);
  }
  return comparator;
};

export default Savings = ({ navigation }) => {
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
  const [completedSavings, setCompletedSavings] = useState(0);
  const [totalSavings, setTotalSavings] = useState(0);
  const [highestSavings, setHighestSavings] = useState(0);

  useEffect(() => {
    getSavings();
    return () => {
      setState({});
    };
  }, [isFocused, totalXp]);

  const getSavings = async () => {
    try {
      let { data: savings, error } = await supabase
        .from("savings")
        .select("*")
        .match({
          user_id: user.id,
          completion_status: false,
        });
      if (error) throw error;

      savings.sort(sortItems(order, orderBy)).reverse();

      setData([]);

      savings.map((saving) => {
        setData((prevSavings) => {
          return [
            {
              id: saving.id,
              name: saving.name,
              description: saving.description,
              amount: saving.amount,
              curr_amount: saving.curr_amount,
              updated_at: saving.updated_at,
              // recurring: saving.recurring,
            },
            ...prevSavings,
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
        setWealthXp(data.wealthXP);
        setWealthLvl(data.wealthLVL);
        setCompleted(data.completed);
        setCompletedFinance(data.completedFinance);
        setCompletedSavings(data.completedSavings);
        setTotalSavings(data.totalSavings);
        setHighestSavings(data.highestSavings);
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const updateExperience = async (saving) => {
    let addXP = 500; // temporary amount

    let newTotalXp = totalXp + addXP;
    let newWealthXp = wealthXp + addXP;
    let totalMax = Math.round(Math.pow(totalLvl / 0.05, 1.6));
    let wealthMax = Math.round(Math.pow(wealthLvl / 0.05, 1.6));

    let addLVL = 0;
    while (newTotalXp >= totalMax) {
      newTotalXp -= totalMax;
      addLVL += 1;
      totalMax = Math.round(Math.pow((totalLvl + addLVL) / 0.05, 1.6));
    }

    let addWealthLVL = 0;
    while (newWealthXp >= wealthMax) {
      newWealthXp -= wealthMax;
      addWealthLVL += 1;
      wealthMax = Math.round(Math.pow((wealthLvl + addWealthLVL) / 0.05, 1.6));
    }

    let amount = parseFloat(saving.curr_amount, 10);

    setTotalXp(newTotalXp);
    setTotalLvl(totalLvl + addLVL);
    setWealthXp(newWealthXp);
    setWealthLvl(wealthLvl + addWealthLVL);
    setCompleted(completed + 1);
    setCompletedFinance(completedFinance + 1);
    setCompletedSavings(completedSavings + 1);
    setTotalSavings(totalSavings + amount);
    setHighestSavings(Math.max(highestSavings, amount));

    try {
      if (!user) throw new Error("No user on the session!");

      const updates = {
        id: user.id,
        updated_at: new Date().toISOString().toLocaleString(),
        totalXP: newTotalXp,
        totalLVL: totalLvl + addLVL,
        wealthXP: newWealthXp,
        wealthLVL: wealthLvl + addWealthLVL,
        completed: completed + 1,
        completedFinance: completedFinance + 1,
        completedSavings: completedSavings + 1,
        totalSavings: totalSavings + amount,
        highestSavings: Math.max(highestSavings, amount),
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

  const sortSavings = (order, orderBy) => {
    setData((exercises) => {
      return exercises.sort(sortItems(order, orderBy));
    });
  };

  const completeItem = async (saving) => {
    try {
      let { data, error } = await supabase
        .from("savings")
        .update({
          completion_status: true,
          completed_at: new Date().toISOString().toLocaleString(),
        })
        .match({ id: saving.id });

      if (error) throw error;

      // const userId = data[0].user_id;

      // if (saving.recurring) {
      //   let { data, error } = await supabase.from("savings").insert([
      //     {
      //       user_id: userId,
      //       name: saving.name,
      //       description: saving.description,
      //       amount: saving.amount,
      //       curr_amount: saving.curr_amount,
      //       updated_at: saving.updated_at,
      //       recurring: saving.recurring,
      //     },
      //   ]);

      //   if (error) throw error;

      //   return data[0];
      // }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const completeSaving = async (saving) => {
    AlertPrompt({
      title: "Complete This Saving Goal?",
      proceedText: "Complete",
      onPress: () => {
        // const recurringSaving = completeItem(saving);
        // if (saving.recurring) {
        //   recurringSaving.then(() => getSavings());
        // } else {
        //   setData((savings) => {
        //     return savings.filter((e) => e != saving);
        //   });
        // }
        completeItem(saving);
        setData((savings) => {
          return savings.filter((s) => s != saving);
        });
        updateExperience(saving);
      },
    });
  };

  const deleteSaving = async (saving) => {
    AlertPrompt({
      title: "Delete This Saving Goal?",
      description: "You can't undo this action.",
      proceedText: "Delete",
      onPress: async () => {
        try {
          let { error } = await supabase
            .from("savings")
            .delete()
            .match({ id: saving.id });

          if (error) throw error;
        } catch (error) {
          Alert.alert(error.message);
        }
        setData((savings) => {
          return savings.filter((s) => s != saving);
        });
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
                source={require("../../assets/bankrupt.png")}
              />
              <Text style={styles.emptyText}>No savings added.</Text>
            </View>
          )}
          keyExtractor={(saving) => saving.id}
          renderItem={({ item }) => (
            <SavingList
              saving={item}
              deleteSaving={deleteSaving}
              completeSaving={completeSaving}
              navigation={navigation}
            />
          )}
          showsVerticalScrollIndicator={false}
          onRefresh={() => {
            setIsFetching(true);
            getSavings();
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
              sortSavings(order, orderBy);
            }}
          />
          <SortButton
            value={order}
            items={orders}
            onValueChange={(order) => {
              setOrder(order);
              sortSavings(order, orderBy);
            }}
          />
          <TouchableOpacity
            style={styles.walletButton}
            onPress={() => {
              navigation.navigate("SavingsSetter", {
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

export { sortItems };
