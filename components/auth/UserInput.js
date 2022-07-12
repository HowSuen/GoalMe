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
              color: "#0656BF",
            }
          : { type: "font-awesome", name: "user", color: "#0656BF" }
      }
      leftIconContainerStyle={{ width: 50 }}
      onChangeText={onChangeText}
      value={value}
      placeholder={label}
      placeholderTextColor="#0656BF"
      autoCapitalize={"none"}
      keyboardType={label === "Email" ? "email-address" : "default"}
    />
  );
};

export default UserInput;

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
