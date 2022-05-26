import React, { useState } from "react";
import { View, StatusBar, FlatList } from "react-native";
import styles from "./GoalTracker.style";
import AddFitness from "../../components/goal-trackers/AddFitness";
import FitnessList from "../../components/goal-trackers/FitnessList";
import Empty from "./Empty";

export default FitnessTracker = () => {
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
            <FitnessList item={item} deleteItem={deleteItem} completeItem={completeItem}/>
          )}
        />
        <View>
          <AddFitness submitHandler={submitHandler} />
        </View>
      </View>
    </View>
  );
}
