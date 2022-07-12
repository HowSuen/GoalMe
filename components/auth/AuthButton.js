import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "react-native-elements";

const AuthButton = ({ loading, textInput, onPressFunc }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      disabled={loading}
      onPress={onPressFunc}
    >
      <Text style={styles.text}>{textInput}</Text>
    </TouchableOpacity>
  );
};

export default AuthButton;

const styles = StyleSheet.create({
  button: {
    marginRight: 10,
    marginLeft: 10,
    paddingVertical: 14,
    backgroundColor: "#0656BF",
    borderRadius: 30,
  },
  text: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
});
