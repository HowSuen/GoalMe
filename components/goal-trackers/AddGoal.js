import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import {
  ComponentContainer,
  InputContainer,
  Input,
  SubmitButton,
} from "./AddGoal.style";

export default function AddGoal({ submitHandler }) {
  const [value, setValue] = useState("");

  const onChangeText = (text) => {
    setValue(text);
  };

  const resetText = () => {
    setValue("");
  };

  return (
    <ComponentContainer>
      <InputContainer>
        <Input
          value={value}
          placeholder="Add a goal!"
          onChangeText={onChangeText}
        />
      </InputContainer>
      <SubmitButton
        onPress={() => {
          setValue(submitHandler(value));
          resetText();
        }}
      >
        <FontAwesome name="plus" size={24} color="black" />
      </SubmitButton>
    </ComponentContainer>
  );
}
