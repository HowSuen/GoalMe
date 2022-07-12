import React, { useEffect, useState } from "react";
import { Alert, View, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import styles from "./CompletedGoals.style";
import supabase from "../../lib/supabase";
import { orders } from "./GoalTracker";
import { sortItems } from "./Modules";
import AlertPrompt from "../../components/goal-trackers/AlertPrompt";
import CompletedModuleList from "../../components/goal-trackers/CompletedModuleList";
import { Image, Text } from "react-native-elements";
import Loading from "../../components/goal-trackers/Loading";

const orderBys = [
  { label: "Date Completed", value: "dateCompleted" },
  { label: "Received Grade", value: "gradeReceived" },
  { label: "Target Grade", value: "targetGrade" },
  { label: "Alphabetical", value: "alphabetical" },
];

const redoItem = async (item) => {
  try {
    let { data, error } = await supabase
      .from("modules")
      .update({
        completion_status: false,
        completed_at: null,
        grade_received: null,
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
      .from("modules")
      .delete()
      .match({ completion_status: true });

    if (error) throw error;
  } catch (error) {
    Alert.alert(error.message);
  }
};

export default CompletedModules = () => {
  const [data, setData] = useState([]);
  const [order, setOrder] = useState("ascending");
  const [orderBy, setOrderBy] = useState("dateCompleted");
  const [isFetching, setIsFetching] = useState(false);
  const user = supabase.auth.user();
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getModules();
    return () => {
      setState({});
    };
  }, []);

  const getModules = async () => {
    setLoading(true);
    try {
      let { data: modules, error } = await supabase
        .from("modules")
        .select("*")
        .match({ user_id: user.id, completion_status: true });

      if (error) throw error;

      modules.sort(sortItems(order, orderBy)).reverse();

      setData([]);

      modules.map((module) => {
        setData((prevModule) => {
          return [
            {
              id: module.id,
              moduleCode: module.module_code,
              moduleName: module.module_name,
              description: module.description,
              targetGrade: module.target_grade,
              gradeReceived: module.grade_received,
              updated_at: module.updated_at,
              completed_at: module.completed_at,
            },
            ...prevModule,
          ];
        });
      });
    } catch (error) {
      Alert.alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const sortModules = (order, orderBy) => {
    setData((modules) => {
      return modules.sort(sortItems(order, orderBy));
    });
  };

  const deleteModule = async (module) => {
    AlertPrompt({
      title: "Delete This Module?",
      description:
        "Doing so will remove its data from Progress Checker.\nYou can't undo this action.",
      proceedText: "Delete",
      onPress: async () => {
        try {
          let { error } = await supabase
            .from("modules")
            .delete()
            .match({ id: module.id });

          if (error) throw error;
        } catch (error) {
          Alert.alert(error.message);
        }
        setData((modules) => {
          return modules.filter((m) => m != module);
        });
      },
    });
  };

  const redoModule = async (module) => {
    AlertPrompt({
      title: "Redo This Module?",
      description:
        "Doing so will remove its completion data from Progress Checker.\nYou can't undo this action.",
      proceedText: "Redo",
      onPress: async () => {
        redoItem(module);
        setData((modules) => {
          return modules.filter((m) => m != module);
        });
      },
    });
  };

  const deleteAllModules = async () => {
    AlertPrompt({
      title: "Delete All Completed Modules?",
      description:
        "Doing so will remove all module data from Progress Checker.\nYou can't undo this action.",
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
                  source={require("../../assets/old_book.png")}
                />
                <Text style={styles.emptyText}>No modules completed.</Text>
              </View>
            )}
            keyExtractor={(module) => module.id}
            renderItem={({ item }) => (
              <CompletedModuleList
                module={item}
                deleteModule={deleteModule}
                redoModule={() => {}}
              />
            )}
            showsVerticalScrollIndicator={false}
            onRefresh={() => {
              setIsFetching(true);
              getModules();
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
              sortModules(order, orderBy);
            }}
          />
          <SortButton
            value={order}
            items={orders}
            onValueChange={(order) => {
              setOrder(order);
              sortModules(order, orderBy);
            }}
          />
          <TouchableOpacity
            style={styles.moduleButton}
            onPress={deleteAllModules}
          >
            <Ionicons name="trash" size={25} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
