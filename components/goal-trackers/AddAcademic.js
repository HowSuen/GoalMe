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

export default AddAcademic = ({ submitHandler }) => {
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
          style={styles.academicSubmitButton}
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
