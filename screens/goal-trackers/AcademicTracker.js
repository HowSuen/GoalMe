import React, { useState } from "react";
import { View, StatusBar, FlatList, KeyboardAvoidingView, Platform } from "react-native";
import styles from "./GoalTracker.style";
import AddAcademic from "../../components/goal-trackers/AddAcademic";
import AcademicList from "../../components/goal-trackers/AcademicList";
import Empty from "./Empty";

export default AcademicTracker = () => {
  const [data, setData] = useState([]);

  const submitHandler = (value) => {
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
      behavior={Platform.OS === "ios" ? "padding" : ""}
      style={styles.componentContainer}
      keyboardVerticalOffset={90}
    >
      <View style={styles.componentContainer}>
        <View>
          <StatusBar barStyle="light-content" backgroundColor="black" />
        </View>

        <View>
          <FlatList
            data={data}
            ListEmptyComponent={() => <Empty />}
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
