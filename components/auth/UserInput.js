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
              color: "#222222",
            }
          : { type: "font-awesome", name: "user", color: "#222222" }
      }
      onChangeText={onChangeText}
      value={value}
      placeholder={label === "Email" ? "email@address.com" : "Username"}
      autoCapitalize={"none"}
      keyboardType={label === "Email" ? "email-address" : "default"}
    />
  );
};

export default UserInput;

const styles = StyleSheet.create({
  textInput: {
    color: "black",
  },
});
