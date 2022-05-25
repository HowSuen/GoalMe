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
    <View style={styles.verticallySpaced}>
      <Input
        style={styles.textInput}
        label="Password"
        leftIcon={{ type: "font-awesome", name: "lock", color: "white" }}
        onChangeText={onChangeText}
        value={password}
        secureTextEntry={passVisible}
        placeholder="Password"
        autoCapitalize={"none"}
      />
      <TouchableOpacity style={styles.icon} onPress={onIconPress}>
        <Icon name={passVisible ? "eye" : "eye-off"} size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default PasswordInput;

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
