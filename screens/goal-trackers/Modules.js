import React, { useEffect, useState } from "react";
import { Alert, View, FlatList, TouchableOpacity } from "react-native";
import styles from "./GoalTracker.style";
import { FontAwesome } from "@expo/vector-icons";
import ModuleList from "../../components/goal-trackers/ModuleList";
import Empty from "./Empty";
import supabase from "../../lib/supabase";
import { useIsFocused, useRoute } from "@react-navigation/native";
import SortButton from "../../components/goal-trackers/SortButton";
import { orders } from "./GoalTracker";

const orderBys = [
  { label: "Alphabetical", value: "alphabetical" },
  { label: "Target Grade", value: "targetGrade" },
  { label: "Difficulty", value: "difficulty" },
  { label: "Date Updated", value: "dateUpdated" },
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

  const convertDate = (date) => {
    return new Date(date);
  };

  let comparator;
  if (orderBy == "targetGrade") {
    comparator = (a, b) => {
      return order == "ascending"
        ? a.targetGrade.localeCompare(b.targetGrade)
        : b.targetGrade.localeCompare(a.targetGrade);
    };
  } else if (orderBy == "dateUpdated") {
    comparator = (a, b) =>
      order == "ascending"
        ? convertDate(a.updated_at) - convertDate(b.updated_at)
        : convertDate(b.updated_at) - convertDate(a.updated_at);
  } else if (orderBy == "difficulty") {
    comparator = (a, b) =>
      order == "ascending"
        ? convertDiff(a.difficulty) - convertDiff(b.difficulty)
        : convertDiff(b.difficulty) - convertDiff(a.difficulty);
  } else if (orderBy == "alphabetical") {
    comparator = (a, b) =>
      order == "ascending"
        ? a.moduleCode.localeCompare(b.moduleCode)
        : b.moduleCode.localeCompare(a.moduleCode);
  }

  return comparator;
};

const convertGrade = (grade) => {
  if (grade == "A+") {
    return 7;
  } else if (grade == "A") {
    return 6;
  } else if (grade == "A-") {
    return 5;
  } else if (grade == "B+") {
    return 4;
  } else if (grade == "B") {
    return 3;
  } else if (grade == "B-") {
    return 2;
  } else {
    return 1;
  }
};

export default Modules = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [order, setOrder] = useState("ascending");
  const [orderBy, setOrderBy] = useState("alphabetical");
  const [gradeReceived, setGradeReceived] = useState("alphabetical");
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

      modules.sort((a, b) => b.module_code.localeCompare(a.module_code));

      modules.map((module) => {
        setData((prevModule) => {
          return [
            {
              id: module.id,
              goalId: module.goal_id,
              moduleCode: module.module_code,
              targetGrade: module.target_grade,
              gradeReceived: module.grade_received,
              difficulty: module.difficulty,
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
        setStrengthXp(data.strengthXP);
        setStrengthLvl(data.strengthLVL);
        setWealthXp(data.wealthXP);
        setWealthLvl(data.wealthLVL);
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const updateExperience = async (module) => {
    let addXP = 0;
    if (module.difficulty == "Hard") {
      addXP = 400;
    } else if (module.difficulty == "Medium") {
      addXP = 300;
    } else if (module.difficulty == "Easy") {
      addXP = 200;
    }

    addXP *= convertGrade(gradeReceived) / convertGrade(module.targetGrade);

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

  const sortModules = (order, orderBy) => {
    setData((modules) => {
      return modules.sort(sortItems(order, orderBy));
    });
  };

  const completeModule = async (module) => {
    try {
      let { data, error } = await supabase
        .from("goals")
        .update({
          completion_status: true,
          completed_at: new Date().toISOString().toLocaleString(),
        })
        .match({ id: module.goalId });

      if (error) throw error;
    } catch (error) {
      Alert.alert(error.message);
    }

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
    AlertPrompt("Delete this module?", async () => {
      try {
        let { error } = await supabase
          .from("modules")
          .delete()
          .match({ id: module.id });

        if (error) throw error;

        let { error: error1 } = await supabase
          .from("goals")
          .delete()
          .match({ id: module.goalId });

        if (error1) throw error1;
      } catch (error) {
        Alert.alert(error.message);
      }
      setData((modules) => {
        return modules.filter((m) => m != module);
      });
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
            <FontAwesome name="plus" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
