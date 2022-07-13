import React, { useEffect, useState } from "react";
import { Alert, View, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import styles from "./CompletedGoals.style";
import supabase from "../../lib/supabase";
import { orders } from "./GoalTracker";
import { sortItems } from "./Savings";
import AlertPrompt from "../../components/goal-trackers/AlertPrompt";
import CompletedSavingList from "../../components/goal-trackers/CompletedSavingList";
import { Image, Text } from "react-native-elements";
import Loading from "../../components/goal-trackers/Loading";

const orderBys = [
  { label: "Date Completed", value: "dateCompleted" },
  { label: "Saving Target ($)", value: "savingTarget" },
  { label: "Alphabetical", value: "alphabetical" },
];

const redoItem = async (item) => {
  try {
    let { data, error } = await supabase
      .from("savings")
      .update({
        completion_status: false,
        completed_at: null,
        curr_amount: "0",
      })
      .match({ id: item.id });

    if (error) throw error;
  } catch (error) {
    Alert.alert(error.message);
  }
};

const deleteAllItems = async () => {
  try {
    let { data, error } = await supabase
      .from("savings")
      .delete()
      .match({ completion_status: true });

    if (error) throw error;
  } catch (error) {
    Alert.alert(error.message);
  }
};

export default CompletedSavings = () => {
  const [data, setData] = useState([]);
  const [order, setOrder] = useState("ascending");
  const [orderBy, setOrderBy] = useState("dateCompleted");
  const [isFetching, setIsFetching] = useState(false);
  const user = supabase.auth.user();
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getSavings();
    return () => {
      setState({});
    };
  }, []);

  const getSavings = async () => {
    setLoading(true);
    try {
      let { data: savings, error } = await supabase
        .from("savings")
        .select("*")
        .match({ user_id: user.id, completion_status: true });

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
              completed_at: saving.completed_at,
            },
            ...prevSavings,
          ];
        });
      });
    } catch (error) {
      Alert.alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const sortSavings = (order, orderBy) => {
    setData((savings) => {
      return savings.sort(sortItems(order, orderBy));
    });
  };

  const deleteSaving = async (saving) => {
    AlertPrompt({
      title: "Delete This Saving Goal?",
      description:
        "Doing so will remove its data from 'Monthly Savings' and 'Daily Goals' in Progress. You can't undo this action.",
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

  const redoSaving = async (saving) => {
    AlertPrompt({
      title: "Redo This Saving Goal?",
      description:
        "Doing so will remove its data from 'Monthly Savings' and 'Daily Goals' in Progress. You can't undo this action.",
      proceedText: "Redo",
      onPress: async () => {
        redoItem(saving);
        setData((savings) => {
          return savings.filter((s) => s != saving);
        });
      },
    });
  };

  const deleteAllSavings = async () => {
    AlertPrompt({
      title: "Delete All Completed Saving Goals?",
      description:
        "Doing so will remove all savings data from 'Monthly Savings' and 'Daily Goals' in Progress. You can't undo this action.",
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
        {loading ? (
          <FlatList
            data={[]}
            ListEmptyComponent={() => <Loading />}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <FlatList
            data={data}
            ListEmptyComponent={() => (
              <View style={styles.emptyContainer}>
                <Image
                  style={styles.emptyImage}
                  source={require("../../assets/bankrupt.png")}
                />
                <Text style={styles.emptyText}>No savings completed.</Text>
              </View>
            )}
            keyExtractor={(saving) => saving.id}
            renderItem={({ item }) => (
              <CompletedSavingList
                saving={item}
                deleteSaving={deleteSaving}
                redoSaving={() => {}}
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
        )}
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
              sortExercises(order, orderBy);
            }}
          />
          <TouchableOpacity
            style={styles.walletButton}
            onPress={deleteAllSavings}
          >
            <Ionicons name="trash" size={25} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
