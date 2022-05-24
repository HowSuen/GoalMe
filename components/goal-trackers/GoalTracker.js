import React, { useState } from "react";
import { View, StatusBar, FlatList } from "react-native";
import styled from "styled-components";
import AddGoal from "./AddGoal";
import GoalList from "./GoalList";
import Header from "./Header";
import Empty from "./Empty";

export default function GoalTracker() {
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
    <ComponentContainer>
      <View>
        <StatusBar barStyle="light-content" backgroundColor="black" />
      </View>

      <View>
        <FlatList
          data={data}
          ListHeaderComponent={() => <Header />}
          ListEmptyComponent={() => <Empty />}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <GoalList item={item} deleteItem={deleteItem} />
          )}
        />
        <View>
          <AddGoal submitHandler={submitHandler} />
        </View>
      </View>
    </ComponentContainer>
  );
}

const ComponentContainer = styled.View`
  background-color: black;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
