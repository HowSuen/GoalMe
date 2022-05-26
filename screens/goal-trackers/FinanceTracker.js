import React, { useState } from "react";
import { View, StatusBar, FlatList, KeyboardAvoidingView } from "react-native";
import styles from "./GoalTracker.style";
import AddFinance from "../../components/goal-trackers/AddFinance";
import FinanceList from "../../components/goal-trackers/FinanceList";
import Empty from "./Empty";

export default FinanceTracker = () => {
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
      behavior="height"
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
          ListEmptyComponent={() => <Empty/>}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <FinanceList item={item} deleteItem={deleteItem} completeItem={completeItem}/>
          )}
        />
        <View>
          <AddFinance submitHandler={submitHandler} />
        </View>
      </View>
    </View>
    </KeyboardAvoidingView>
  );
}
