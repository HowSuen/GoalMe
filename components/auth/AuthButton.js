import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "react-native-elements";

const AuthButton = ({loading, textInput, onPressFunc}) => {
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
    marginRight: 20,
    marginLeft: 20,
    marginTop: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "dodgerblue",
    borderRadius: 5,
    elevation: 10,
  },
  text:{
    color:"white",
    fontSize:17,
    textAlign:"center",
  }
});