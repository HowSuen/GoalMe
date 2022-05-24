import React, { useState } from "react";
import { View, StatusBar, FlatList } from "react-native";
import styles from "./GoalTracker.style";
import AddFitness from "../../components/goal-trackers/AddFitness";
import FitnessList from "../../components/goal-trackers/FitnessList";
import EmptyGoals from "./EmptyGoals";

export default FitnessTracker = () => {
  const [data, setData] = useState([]);

  const submitHandler = (value) => {
    setData((prevTodo) => {
      return [
        {
          value: value,
          key: Math.random().toString(),
        },
        ...prevTodo,
      ];
    });
  };

  const deleteItem = (key) => {
    setData((prevTodo) => {
      return prevTodo.filter((todo) => todo.key != key);
    });
  };

  return (
    <View style={styles.componentContainer}>
      <View>
        <StatusBar barStyle="light-content" backgroundColor="black" />
      </View>

      <View>
        <FlatList
          data={data}
          ListEmptyComponent={() => <EmptyGoals />}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <FitnessList item={item} deleteItem={deleteItem} />
          )}
        />
        <View>
          <AddFitness submitHandler={submitHandler} />
        </View>
      </View>
    </View>
  );
}
