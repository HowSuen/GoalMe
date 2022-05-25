import React from "react";
import { StyleSheet } from "react-native";
import { Input } from "react-native-elements";

const UserInput = ({ label, onChangeText, value }) => {
  return (
    <Input
      style={styles.textInput}
      label={label}
      leftIcon={
        label === "Email"
          ? {
              type: "font-awesome",
              name: "envelope",
              color: "white",
            }
          : { type: "font-awesome", name: "user", color: "white" }
      }
      onChangeText={onChangeText}
      value={value}
      placeholder={label === "Email" ? "email@address.com" : "Username"}
      autoCapitalize={"none"}
    />
  );
};

export default UserInput;

const styles = StyleSheet.create({
  textInput: {
    color: "white",
  },
});
