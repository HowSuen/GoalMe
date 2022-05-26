import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import styles from "./AddGoal.style";
import {
  View,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const AddAcademic = ({ submitHandler }) => {
  const [value, setValue] = useState("");

  const onChangeText = (text) => {
    setValue(text);
  };

  const resetText = () => {
    setValue("");
  };

  return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.componentContainer}>
          <View style={styles.componentContainer}>
            <TextInput
              style={styles.input}
              value={value}
              placeholder="Add an academic goal..."
              placeholderTextColor="dimgray"
              onChangeText={onChangeText}
            />
          </View>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => {
              setValue(submitHandler(value));
              resetText();
            }}
          >
            <FontAwesome name="plus" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
  );
};

export default AddAcademic;
