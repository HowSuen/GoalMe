import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import styles from "./AddGoal.style";
import {
  View,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default AddFinance = ({ submitHandler }) => {
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
            placeholder="Add a finance goal..."
            placeholderTextColor="dimgray"
            onChangeText={onChangeText}
          />
        </View>
        <TouchableOpacity
          style={styles.financeSubmitButton}
          onPress={() => {
            if (value == "") Alert.alert("Write something first!");
            else {
              setValue(submitHandler(value));
              resetText();
            }
          }}
        >
          <FontAwesome name="plus" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};
