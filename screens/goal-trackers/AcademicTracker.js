import React, { useEffect, useState } from "react";
import { View, StatusBar, FlatList, KeyboardAvoidingView, Platform } from "react-native";
import styles from "./GoalTracker.style";
import AddAcademic from "../../components/goal-trackers/AddAcademic";
import AcademicList from "../../components/goal-trackers/AcademicList";
import Empty from "./Empty";
import { supabase } from "../../lib/supabase";

export default AcademicTracker = () => {
  const [data, setData] = useState([]);
  const user = supabase.auth.user()

  useEffect(() => {
    (async () => {
      let { data: goals, error } = await supabase
      .from("goals")
      .select("id, content")
      .eq("user_id", user.id)
      
      // !error && setData([goals][1]);
      console.log(goals)
      // const contents = goals.map((item) => {
      //   return (
      //     <View>{item.content}</View>
      //   )
      // })
      // setData(contents);
      setData(goals.map((goal) => {
        return [
          {
            value: goal.content,
            key: goal.id,
          },
        ];
      }));
    })();
  }, []);

  const submitHandler = async (value) => {
    const { data, error } = await supabase
            .from('goals')
            .insert([
                { content: value, user_id: user.id },
            ]);
    
    console.log(data, error);
    setData((prevGoal) => {
      return [
        {
          value: value,
          key: Math.random().toString(),
        },
        ...prevGoal,
      ];
    });
  };

  // const acadData = async () => {
  //   let { data, error } = await supabase
  //   .from('goals')
  //   .select('content')
  //   .eq('user_id', user.id)
    
  //   console.log(data, error);
  //   setData({data});
  // };

  const deleteItem = (key) => {
    setData((prevGoal) => {
      return prevGoal.filter((goal) => goal.key != key);
    });
  };

  const completeItem = (key) => {
    setData((prevGoal) => {
      return prevGoal.filter((goal) => goal.key != key);
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "height" : ""}
      keyboardVerticalOffset={90}
    >
      <View style={styles.componentContainer}>
        <View>
          <StatusBar barStyle="light-content" backgroundColor="black" />
        </View>

        <View>
          <FlatList
            data={data}
            ListEmptyComponent={() => <Empty/>}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => (
              <AcademicList
                item={item}
                deleteItem={deleteItem}
                completeItem={completeItem}
              />
            )}
          />
          <View>
            <AddAcademic submitHandler={submitHandler} />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
