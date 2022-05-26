import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Input } from "react-native-elements";

const PasswordSecureInput = ({
  password,
  onChangeText,
  placeholder
}) => {
  return (
    <View style={styles.verticallySpaced}>
      <Input
        style={styles.textInput}
        label="Password"
        leftIcon={{ type: "font-awesome", name: "lock", color: "white" }}
        onChangeText={onChangeText}
        value={password}
        secureTextEntry={true}
        placeholder={placeholder}
        autoCapitalize={"none"}
      />
    </View>
  );
};

export default PasswordSecureInput;

const styles = StyleSheet.create({
  verticallySpaced: {
    paddingTop: 5,
    paddingBottom: 5,
    alignSelf: "stretch",
  },
  textInput: {
    color: "white",
  },
  icon: {
    position: "absolute",
    top: 45,
    right: 20,
  },
});
