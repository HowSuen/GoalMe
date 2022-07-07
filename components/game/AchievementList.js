import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, SectionList, Alert } from "react-native";
import supabase from "../../lib/supabase";
import { useIsFocused } from "@react-navigation/native";
import Achievement from "./Achievement";

const AchievementList = ({ navigation, session }) => {
  const isFocused = useIsFocused();

  const [avatar1, setAvatar1] = useState(false);
  const [goal1, setGoal1] = useState(false);
  const [goal50, setGoal50] = useState(false);
  const [goal100, setGoal100] = useState(false);
  const [goal200, setGoal200] = useState(false);
  const [level2, setLevel2] = useState(false);
  const [level5, setLevel5] = useState(false);
  const [level10, setLevel10] = useState(false);
  const [level20, setLevel20] = useState(false);
  const [level30, setLevel30] = useState(false);
  const [acad5, setAcad5] = useState(false);
  const [acad10, setAcad10] = useState(false);
  const [acad25, setAcad25] = useState(false);
  const [acad50, setAcad50] = useState(false);
  const [acad75, setAcad75] = useState(false);
  const [acad100, setAcad100] = useState(false);
  const [fit5, setFit5] = useState(false);
  const [fit10, setFit10] = useState(false);
  const [fit25, setFit25] = useState(false);
  const [fit50, setFit50] = useState(false);
  const [fit75, setFit75] = useState(false);
  const [fit100, setFit100] = useState(false);
  const [money5, setMoney5] = useState(false);
  const [money10, setMoney10] = useState(false);
  const [money25, setMoney25] = useState(false);
  const [money50, setMoney50] = useState(false);
  const [money75, setMoney75] = useState(false);
  const [money100, setMoney100] = useState(false);
  const [wislvl5, setWislvl5] = useState(false);
  const [wislvl10, setWislvl10] = useState(false);
  const [wislvl20, setWislvl20] = useState(false);
  const [wislvl30, setWislvl30] = useState(false);
  const [fitlvl5, setFitlvl5] = useState(false);
  const [fitlvl10, setFitlvl10] = useState(false);
  const [fitlvl20, setFitlvl20] = useState(false);
  const [fitlvl30, setFitlvl30] = useState(false);
  const [finlvl5, setFinlvl5] = useState(false);
  const [finlvl10, setFinlvl10] = useState(false);
  const [finlvl20, setFinlvl20] = useState(false);
  const [finlvl30, setFinlvl30] = useState(false);

  const [isFetching, setIsFetching] = useState(false);
  const [state, setState] = useState({});

  useEffect(() => {
    getAchievements();
    return () => {
      setState({});
    };
  }, [isFocused]);

  const user = supabase.auth.user();

  const getAchievements = async () => {
    let promise;
    try {
      if (!user) throw new Error("No user on the session!");

      let { data, error, status } = await supabase
        .from("achievements")
        .select()
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setAvatar1(data.avatar1);
        setGoal1(data.goal1);
        setGoal50(data.goal50);
        setGoal100(data.goal100);
        setGoal200(data.goal200);
        setLevel2(data.level2);
        setLevel5(data.level5);
        setLevel10(data.level10);
        setLevel20(data.level20);
        setLevel30(data.level30);
        setAcad5(data.acad5);
        setAcad10(data.acad10);
        setAcad25(data.acad25);
        setAcad50(data.acad50);
        setAcad75(data.acad75);
        setAcad100(data.acad100);
        setFit5(data.fit5);
        setFit10(data.fit10);
        setFit25(data.fit25);
        setFit50(data.fit50);
        setFit75(data.fit75);
        setFit100(data.fit100);
        setMoney5(data.money5);
        setMoney10(data.money10);
        setMoney25(data.money25);
        setMoney50(data.money50);
        setMoney75(data.money75);
        setMoney100(data.money100);
        setWislvl5(data.wislvl5);
        setWislvl10(data.wislvl10);
        setWislvl20(data.wislvl20);
        setWislvl30(data.wislvl30);
        setFitlvl5(data.fitlvl5);
        setFitlvl10(data.fitlvl10);
        setFitlvl20(data.fitlvl20);
        setFitlvl30(data.fitlvl30);
        setFinlvl5(data.finlvl5);
        setFinlvl10(data.finlvl10);
        setFinlvl20(data.finlvl20);
        setFinlvl30(data.finlvl30);
      }

      promise = data;
    } catch (error) {
      Alert.alert(error.message);
    }
    return promise;
  };

  const data = [
    {
      title: "Main",
      data: [
        {
          id: 0,
          name: "Fashionista",
          description: "Customise your Avatar",
          completed: avatar1,
        },
        {
          id: 1,
          name: "Novice",
          description: "Complete your first goal",
          completed: goal1,
        },
        {
          id: 2,
          name: "Hardworker",
          description: "Complete 50 goals",
          completed: goal50,
        },
        {
          id: 3,
          name: "Master",
          description: "Complete 100 goals",
          completed: goal100,
        },
        {
          id: 4,
          name: "Prodigy",
          description: "Complete 200 goals",
          completed: goal200,
        },
        {
          id: 5,
          name: "Beginner",
          description: "Reach Level 2",
          completed: level2,
        },
        {
          id: 6,
          name: "Adventurer",
          description: "Reach Level 5",
          completed: level5,
        },
        {
          id: 7,
          name: "Expert",
          description: "Reach Level 10",
          completed: level10,
        },
        {
          id: 8,
          name: "Overlord",
          description: "Reach Level 20",
          completed: level20,
        },
        {
          id: 9,
          name: "God",
          description: "Reach Level 30",
          completed: level30,
        },
      ],
    },
    {
      title: "Wisdom",
      data: [
        {
          id: 10,
          name: "Studious",
          description: "Complete 5 Academic goals",
          completed: acad5,
        },
        {
          id: 11,
          name: "Geek",
          description: "Complete 10 Academic goals",
          completed: acad10,
        },
        {
          id: 12,
          name: "Scholar",
          description: "Complete 25 Academic goals",
          completed: acad25,
        },
        {
          id: 13,
          name: "Genius",
          description: "Complete 50 Academic goals",
          completed: acad50,
        },
        {
          id: 14,
          name: "Professor",
          description: "Complete 75 Academic goals",
          completed: acad75,
        },
        {
          id: 15,
          name: "Big Brain",
          description: "Complete 100 Academic goals",
          completed: acad100,
        },
        {
          id: 28,
          name: "Smart",
          description: "Reach Level 5 Wisdom",
          completed: wislvl5,
        },
        {
          id: 29,
          name: "Wise One",
          description: "Reach Level 10 Wisdom",
          completed: wislvl10,
        },
        {
          id: 30,
          name: "Sharpest Tool in the Shed",
          description: "Reach Level 20 Wisdom",
          completed: wislvl20,
        },
        {
          id: 31,
          name: "200IQ",
          description: "Reach Level 30 Wisdom",
          completed: wislvl30,
        },
      ],
    },
    {
      title: "Strength",
      data: [
        {
          id: 16,
          name: "Strong",
          description: "Complete 5 Fitness goals",
          completed: fit5,
        },
        {
          id: 17,
          name: "Powerful",
          description: "Complete 10 Fitness goals",
          completed: fit10,
        },
        {
          id: 18,
          name: "On the Sigma Grind",
          description: "Complete 25 Fitness goals",
          completed: fit25,
        },
        {
          id: 19,
          name: "Gigachad",
          description: "Complete 50 Fitness goals",
          completed: fit50,
        },
        {
          id: 20,
          name: "Morbius",
          description: "Complete 75 Fitness goals",
          completed: fit75,
        },
        {
          id: 21,
          name: "Avenger Level Threat",
          description: "Complete 100 Fitness goals",
          completed: fit100,
        },
        {
          id: 32,
          name: "Fighter",
          description: "Reach Level 5 Strength",
          completed: fitlvl5,
        },
        {
          id: 33,
          name: "Warrior",
          description: "Reach Level 10 Strength",
          completed: fitlvl10,
        },
        {
          id: 34,
          name: "The Rock",
          description: "Reach Level 20 Strength",
          completed: fitlvl20,
        },
        {
          id: 35,
          name: "Built Different",
          description: "Reach Level 30 Strength",
          completed: fitlvl30,
        },
      ],
    },
    {
      title: "Wealth",
      data: [
        {
          id: 22,
          name: "Frugal",
          description: "Complete 5 Financial goals",
          completed: money5,
        },
        {
          id: 23,
          name: "Banker",
          description: "Complete 10 Financial goals",
          completed: money10,
        },
        {
          id: 24,
          name: "Loaded",
          description: "Complete 25 Financial goals",
          completed: money25,
        },
        {
          id: 25,
          name: "Millionaire",
          description: "Complete 50 Financial goals",
          completed: money50,
        },
        {
          id: 26,
          name: "Bilionaire",
          description: "Complete 75 Financial goals",
          completed: money75,
        },
        {
          id: 27,
          name: "Morbillionaire",
          description: "Complete 100 Financial goals",
          completed: money100,
        },
        {
          id: 36,
          name: "Cash Me Ousside",
          description: "Reach Level 5 Wealth",
          completed: finlvl5,
        },
        {
          id: 37,
          name: "Duke",
          description: "Reach Level 10 Wealth",
          completed: finlvl10,
        },
        {
          id: 38,
          name: "CEO",
          description: "Reach Level 20 Wealth",
          completed: finlvl20,
        },
        {
          id: 39,
          name: "Tycoon",
          description: "Reach Level 30 Wealth",
          completed: finlvl30,
        },
      ],
    },
  ];

  return (
    <View style={styles.listContainer}>
      <SectionList
        sections={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Achievement item={item} />}
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
        onRefresh={() => {
          setIsFetching(true);
          getAchievements();
          setIsFetching(false);
        }}
        refreshing={isFetching}
      />
    </View>
  );
};

export default AchievementList;

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  sectionHeader: {
    paddingTop: 15,
    paddingLeft: 20,
    paddingRight: 10,
    paddingBottom: 5,
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: "ghostwhite",
    color: "#2d2b2c",
  },
});
