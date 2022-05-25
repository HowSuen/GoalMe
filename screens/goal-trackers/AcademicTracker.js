import React, { useState } from "react";
import { View, StatusBar, FlatList } from "react-native";
import styles from "./GoalTracker.style";
import AddAcademic from "../../components/goal-trackers/AddAcademic";
import AcademicList from "../../components/goal-trackers/AcademicList";
import Empty from "./Empty";

export default AcademicTracker = () => {
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
  
  const completeItem = (key) => {
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
          ListEmptyComponent={() => <Empty/>}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <AcademicList item={item} deleteItem={deleteItem} completeItem={completeItem}/>
          )}
        />
        <View>
          <AddAcademic submitHandler={submitHandler} />
        </View>
      </View>
    </View>
  );
}
