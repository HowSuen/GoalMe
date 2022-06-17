import React, { useEffect, useState } from "react";
import { Alert, View, FlatList, TouchableOpacity } from "react-native";
import styles from "./GoalTracker.style";
import { FontAwesome5 } from "@expo/vector-icons";
import ModuleList from "../../components/goal-trackers/ModuleList";
import Empty from "./Empty";
import supabase from "../../lib/supabase";
import { useIsFocused, useRoute } from "@react-navigation/native";
import SortButton from "../../components/goal-trackers/SortButton";
import { orders } from "./GoalTracker";

const orderBys = [
  { label: "Alphabetical", value: "alphabetical" },
  { label: "Target Grade", value: "targetGrade" },
  { label: "Date Updated", value: "dateUpdated" },
];

const grades = [
  { label: "A+", value: "A+" },
  { label: "A", value: "A" },
  { label: "A-", value: "A-" },
  { label: "B+", value: "B+" },
  { label: "B", value: "B" },
  { label: "B-", value: "B-" },
  { label: "C+", value: "C+" },
  { label: "C", value: "C" },
  { label: "C-", value: "C-" },
  { label: "D+", value: "D+" },
  { label: "D", value: "D" },
  { label: "F", value: "F" },
  { label: "F*", value: "F*" },
  // { label: "S", value: "S" },
  // { label: "U", value: "U" },
];

const compareGrade = (g1, g2) => {
  const symOrder = { "+": -1, "-": 1, "": 0 };
  return (
    g2.charAt(0).localeCompare(g1.charAt(0)) ||
    symOrder[g2.charAt(1)] - symOrder[g1.charAt(1)]
  );
};

const sortItems = (order, orderBy) => {
  const convertDate = (date) => {
    return new Date(date);
  };

  let comparator;
  if (orderBy == "targetGrade") {
    comparator = (a, b) => {
      const s1 = a.targetGrade || a.target_grade;
      const s2 = b.targetGrade || b.target_grade;
      return order == "ascending" ? compareGrade(s1, s2) : compareGrade(s2, s1);
    };
  } else if (orderBy == "dateUpdated") {
    comparator = (a, b) =>
      order == "ascending"
        ? convertDate(a.updated_at) - convertDate(b.updated_at)
        : convertDate(b.updated_at) - convertDate(a.updated_at);
  } else if (orderBy == "alphabetical") {
    comparator = (a, b) => {
      const s1 = a.moduleCode || a.module_code || a.moduleName || a.module_name;
      const s2 = b.moduleCode || b.module_code || b.moduleName || b.module_name;
      return order == "ascending" ? s1.localeCompare(s2) : s2.localeCompare(s1);
    };
  }

  return comparator;
};

export default Modules = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [order, setOrder] = useState("ascending");
  const [orderBy, setOrderBy] = useState("alphabetical");
  const [gradeReceived, setGradeReceived] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const user = supabase.auth.user();
  const isFocused = useIsFocused();
  const route = useRoute();

  const [totalXp, setTotalXp] = useState(0);
  const [wisdomXp, setWisdomXp] = useState(0);
  const [totalLvl, setTotalLvl] = useState(1);
  const [wisdomLvl, setWisdomLvl] = useState(1);
  const [completed, setCompleted] = useState(0);
  const [completedAcad, setCompletedAcad] = useState(0);

  useEffect(() => {
    getModules();
  }, [isFocused, totalXp]);

  const getModules = async () => {
    try {
      let { data: modules, error } = await supabase
        .from("modules")
        .select("*")
        .match({
          user_id: user.id,
          completion_status: false,
        });

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
            },
            ...prevModule,
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
        setCompleted(data.completed);
        setCompletedAcad(data.completedAcad);
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const updateExperience = async (module) => {
    let addXP = 0;
    if (module.targetGrade == "A+") {
      addXP = 2000;
    } else if (module.targetGrade == "A") {
      addXP = 1900;
    } else if (module.targetGrade == "A-") {
      addXP = 1800;
    } else if (module.targetGrade == "B+") {
      addXP = 1700;
    } else if (module.targetGrade == "B") {
      addXP = 1600;
    } else if (module.targetGrade == "B-") {
      addXP = 1500;
    } else if (module.targetGrade == "C+") {
      addXP = 1300;
    } else if (module.targetGrade == "C") {
      addXP = 1100;
    } else if (module.targetGrade == "C-") {
      addXP = 900;
    } else if (module.targetGrade == "D+") {
      addXP = 600;
    } else if (module.targetGrade == "D") {
      addXP = 400;
    } else if (module.targetGrade == "F") {
      addXP = 200;
    } else if (module.targetGrade == "F*") {
      addXP = 100;
    }

    addXP += compareGrade(module.targetGrade, gradeReceived) <= 0 ? 200 : 0;

    const newTotalXp = totalXp + addXP;
    const newWisdomXp = wisdomXp + addXP;
    const totalMax = Math.round(Math.pow(totalLvl / 0.07, 2));
    const wisdomMax = Math.round(Math.pow(wisdomLvl / 0.07, 2));

    setTotalXp(newTotalXp >= totalMax ? newTotalXp % totalMax : newTotalXp);
    setTotalLvl(newTotalXp >= totalMax ? totalLvl + 1 : totalLvl);
    setWisdomXp(
      newWisdomXp >= wisdomMax ? newWisdomXp % wisdomMax : newWisdomXp
    );
    setWisdomLvl(newWisdomXp >= wisdomMax ? wisdomLvl + 1 : wisdomLvl);
    setCompleted(completed + 1);
    setCompletedAcad(completedAcad + 1);

    try {
      if (!user) throw new Error("No user on the session!");

      const updates = {
        id: user.id,
        updated_at: new Date().toISOString().toLocaleString(),
        totalXP: newTotalXp >= totalMax ? newTotalXp % totalMax : newTotalXp,
        totalLVL: newTotalXp >= totalMax ? totalLvl + 1 : totalLvl,
        wisdomXP:
          newWisdomXp >= wisdomMax ? newWisdomXp % wisdomMax : newWisdomXp,
        wisdomLVL: newWisdomXp >= wisdomMax ? wisdomLvl + 1 : wisdomLvl,
        completed: completed + 1,
        completedAcad: completedAcad + 1,
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

  const sortModules = (order, orderBy) => {
    setData((modules) => {
      return modules.sort(sortItems(order, orderBy));
    });
  };

  const completeModule = async (module) => {
    try {
      let { data, error } = await supabase
        .from("modules")
        .update({
          grade_received: gradeReceived,
          completion_status: true,
          completed_at: new Date().toISOString().toLocaleString(),
        })
        .match({ id: module.id });

      if (error) throw error;
    } catch (error) {
      Alert.alert(error.message);
    }

    updateExperience(module);

    setData((modules) => {
      return modules.filter((m) => m != module);
    });
  };

  const deleteModule = async (module) => {
    AlertPrompt({
      title: "Delete This Module?",
      description: "You can't undo this action.",
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

  return (
    <View style={styles.container}>
      <View>
        <FlatList
          data={data}
          ListEmptyComponent={() => <Empty text={"No modules added."} />}
          keyExtractor={(module) => module.id}
          renderItem={({ item }) => (
            <ModuleList
              module={item}
              deleteModule={deleteModule}
              completeModule={completeModule}
              onChangeText={(text) => setGradeReceived(text)}
              navigation={navigation}
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
            onPress={() => {
              navigation.navigate("ModuleSetter", {
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

export { grades };
