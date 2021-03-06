import React, { useEffect, useState } from "react";
import { Alert, View, FlatList, TouchableOpacity, Text } from "react-native";
import styles from "./GoalTracker.style";
import { FontAwesome5 } from "@expo/vector-icons";
import ModuleList from "../../components/goal-trackers/ModuleList";
import supabase from "../../lib/supabase";
import { useIsFocused, useRoute } from "@react-navigation/native";
import SortButton from "../../components/goal-trackers/SortButton";
import { orders } from "./GoalTracker";
import { Image } from "react-native-elements";

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
];

const compareGrade = (g1, g2) => {
  if (!g1) return -1;
  if (!g2) return 1;

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
  } else if (orderBy == "dateCompleted") {
    comparator = (a, b) =>
      order == "ascending"
        ? convertDate(a.completed_at) - convertDate(b.completed_at)
        : convertDate(b.completed_at) - convertDate(a.completed_at);
  } else if (orderBy == "gradeReceived") {
    comparator = (a, b) => {
      const s1 = a.gradeReceived || a.grade_received;
      const s2 = b.gradeReceived || b.grade_received;
      return order == "ascending" ? compareGrade(s1, s2) : compareGrade(s2, s1);
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
  const [state, setState] = useState({});

  const [totalXp, setTotalXp] = useState(0);
  const [wisdomXp, setWisdomXp] = useState(0);
  const [totalLvl, setTotalLvl] = useState(1);
  const [wisdomLvl, setWisdomLvl] = useState(1);
  const [completed, setCompleted] = useState(0);
  const [completedAcad, setCompletedAcad] = useState(0);
  const [completedMod, setCompletedMod] = useState(0);
  const [modsTargetReached, setModsTargetReached] = useState(0);
  const [aboveA, setAboveA] = useState(0);
  const [highestGrade, setHighestGrade] = useState(null);

  useEffect(() => {
    getModules();
    return () => {
      setState({});
    };
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
        setCompletedMod(data.completedMod);
        setModsTargetReached(data.modsTargetReached);
        setAboveA(data.aboveA);
        setHighestGrade(data.highestGrade);
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const updateExperience = async (module) => {
    let addXP = 0;
    if (gradeReceived == "A+") {
      addXP = 2000;
    } else if (gradeReceived == "A") {
      addXP = 1900;
    } else if (gradeReceived == "A-") {
      addXP = 1800;
    } else if (gradeReceived == "B+") {
      addXP = 1700;
    } else if (gradeReceived == "B") {
      addXP = 1600;
    } else if (gradeReceived == "B-") {
      addXP = 1500;
    } else if (gradeReceived == "C+") {
      addXP = 1300;
    } else if (gradeReceived == "C") {
      addXP = 1100;
    } else if (gradeReceived == "C-") {
      addXP = 900;
    } else if (gradeReceived == "D+") {
      addXP = 600;
    } else if (gradeReceived == "D") {
      addXP = 400;
    } else if (gradeReceived == "F") {
      addXP = 200;
    } else if (gradeReceived == "F*") {
      addXP = 100;
    }

    let addMod = 0;
    if (compareGrade(module.targetGrade, gradeReceived) <= 0) {
      addXP += 200;
      addMod += 1;
    }

    let addA = compareGrade(gradeReceived, "A") >= 0 ? 1 : 0;

    let grade =
      compareGrade(highestGrade, gradeReceived) < 0
        ? gradeReceived
        : highestGrade;

    let newTotalXp = totalXp + addXP;
    let newWisdomXp = wisdomXp + addXP;
    let totalMax = Math.round(Math.pow(totalLvl / 0.05, 1.6));
    let wisdomMax = Math.round(Math.pow(wisdomLvl / 0.05, 1.6));

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

    setTotalXp(newTotalXp);
    setTotalLvl(totalLvl + addLVL);
    setWisdomXp(newWisdomXp);
    setWisdomLvl(wisdomLvl + addWisdomLVL);
    setCompleted(completed + 1);
    setCompletedAcad(completedAcad + 1);
    setCompletedMod(completedMod + 1);
    setModsTargetReached(modsTargetReached + addMod);
    setAboveA(aboveA + addA);
    setHighestGrade(grade);

    try {
      if (!user) throw new Error("No user on the session!");

      const updates = {
        id: user.id,
        updated_at: new Date().toISOString().toLocaleString(),
        totalXP: newTotalXp,
        totalLVL: totalLvl + addLVL,
        wisdomXP: newWisdomXp,
        wisdomLVL: wisdomLvl + addWisdomLVL,
        completed: completed + 1,
        completedAcad: completedAcad + 1,
        completedMod: completedMod + 1,
        modsTargetReached: modsTargetReached + addMod,
        aboveA: aboveA + addA,
        highestGrade: grade,
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
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Image
                style={styles.emptyImage}
                source={require("../../assets/old_book.png")}
              />
              <Text style={styles.emptyText}>No modules added.</Text>
            </View>
          )}
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

export { grades, sortItems, compareGrade };
