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
        color: "#0656BF",
        size: 28,
      }}
      leftIconContainerStyle={{ width: 50 }}
      onChangeText={onChangeText}
      value={password}
      secureTextEntry={true}
      placeholder={placeholder}
      placeholderTextColor="#0656BF"
      autoCapitalize={"none"}
    />
  );
};

export default PasswordSecureInput;

const styles = StyleSheet.create({
  textInput: {
    color: "#052440",
  },
  inputContainer: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    backgroundColor: "#9DCDF1",
    borderRadius: 30,
    borderColor: "transparent",
  },
});
