import Dialog from "react-native-dialog";
import { View, StyleSheet, Platform } from "react-native";
import { BlurView } from "expo-blur";
import { useState, useEffect } from "react";

export default UsernamePrompt = ({
  defaultName,
  updateName,
  visible,
  setVisible,
}) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue("");
  }, [visible]);

  return (
    <View style={styles.container}>
      <Dialog.Container visible={visible} blurComponentIOS={blurComponentIOS}>
        <Dialog.Title>Change Username</Dialog.Title>
        <Dialog.Input
          wrapperStyle={
            Platform.OS === "ios" ? styles.iosWrapper : styles.wrapper
          }
          style={Platform.OS === "ios" ? styles.iosInput : styles.input}
          placeholder={defaultName}
          placeholderTextColor="gray"
          value={value}
          onChangeText={(text) => {
            setValue(text);
          }}
          underlineColorAndroid="transparent"
        ></Dialog.Input>
        <Dialog.Button label="Cancel" onPress={() => setVisible(false)} />
        <Dialog.Button
          label="Done"
          onPress={() => updateName(value)}
          disabled={value == ""}
        />
      </Dialog.Container>
    </View>
  );
};

const blurComponentIOS = (
  <BlurView style={StyleSheet.absoluteFill} intensity={90} tint="dark" />
);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    backgroundColor: "transparent",
    color: "black",
    fontSize: 16,
  },
  iosInput: {
    backgroundColor: "white",
    color: "black",
    fontSize: 16,
  },
  wrapper: {
    backgroundColor: "#fafafa",
    borderWidth: 1,
    borderColor: "#eeeeee",
    paddingLeft: 5,
    paddingTop: 2,
    maxWidth: 255,
  },
  iosWrapper: {
    backgroundColor: "white",
  },
});
