import React from "react";
import { View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import {
  ListContainer,
  ComponentContainer,
  TextItem,
  TextDate,
  IconContainer,
  CirlceContainer,
} from "./GoalList.style";

export default function GoalList({ item, deleteItem }) {
  return (
    <ComponentContainer>
      <ListContainer>
        <CirlceContainer>
          <FontAwesome name="circle-o" size={20} color="darkgreen" />
        </CirlceContainer>
        <View>
          <TextItem>{item.value}</TextItem>
          <TextDate>Goal</TextDate>
        </View>
        <IconContainer onPress={() => deleteItem(item.key)}>
          <FontAwesome name="trash-o" size={27} color="darkred" />
        </IconContainer>
      </ListContainer>
    </ComponentContainer>
  );
}
