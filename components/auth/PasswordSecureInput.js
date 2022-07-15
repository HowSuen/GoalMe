import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Input } from "react-native-elements";

const PasswordSecureInput = ({ password, onChangeText, placeholder }) => {
  return (
    <Input
      style={styles.textInput}
      inputContainerStyle={styles.inputContainer}
      leftIcon={{
        type: "font-awesome",
        name: "lock",
        color: "rgb(10,102,132)",
        size: 28,
      }}
      leftIconContainerStyle={{ width: 50 }}
      onChangeText={onChangeText}
      value={password}
      secureTextEntry={true}
      placeholder={placeholder}
      placeholderTextColor="rgb(10,102,132)"
      autoCapitalize={"none"}
    />
  );
};

export default PasswordSecureInput;

const styles = StyleSheet.create({
  textInput: {
    color: "rgb(7,71,92)",
  },
  inputContainer: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    backgroundColor: "rgb(152,209,205)",
    borderRadius: 30,
    borderColor: "transparent",
  },
});
