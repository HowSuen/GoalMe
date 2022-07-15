import React from "react";
import { StyleSheet } from "react-native";
import { Input } from "react-native-elements";

const UserInput = ({ label, onChangeText, value }) => {
  return (
    <Input
      style={styles.textInput}
      inputContainerStyle={styles.inputContainer}
      leftIcon={
        label === "Email"
          ? {
              type: "font-awesome",
              name: "envelope",
              color: "rgb(10,102,132)",
            }
          : { type: "font-awesome", name: "user", color: "rgb(10,102,132)" }
      }
      leftIconContainerStyle={{ width: 50 }}
      onChangeText={onChangeText}
      value={value}
      placeholder={label}
      placeholderTextColor="rgb(10,102,132)"
      autoCapitalize={"none"}
      keyboardType={label === "Email" ? "email-address" : "default"}
    />
  );
};

export default UserInput;

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
