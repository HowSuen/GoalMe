import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Input } from "react-native-elements";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";

const PasswordInput = ({
  password,
  passVisible,
  onChangeText,
  onIconPress,
}) => {
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
      secureTextEntry={passVisible}
      placeholder="Password"
      placeholderTextColor="rgb(10,102,132)"
      autoCapitalize={"none"}
      rightIcon={() => (
        <TouchableOpacity onPress={onIconPress}>
          <Icon
            name={passVisible ? "eye" : "eye-off"}
            size={26}
            color="rgb(10,102,132)"
          />
        </TouchableOpacity>
      )}
      rightIconContainerStyle={{ paddingLeft: 10, paddingRight: 10 }}
    />
  );
};

export default PasswordInput;

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
