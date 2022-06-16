import Dialog from "react-native-dialog";
import { View, StyleSheet, Alert } from "react-native";
import { BlurView } from "expo-blur";
import { useState } from "react";

export default DialogPrompt = ({
  title,
  description,
  placeholder,
  matches,
  onChangeText,
  onPress,
  visible,
  setVisible,
}) => {
  const [value, setValue] = useState("");

  const isMatch = (text) => {
    if (matches) {
      return matches.filter(m => m.label == text).length != 0;
    }
    return true;
  };

  return (
    <View style={styles.container}>
      <Dialog.Container visible={visible} blurComponentIOS={blurComponentIOS}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Description>{description}</Dialog.Description>
        <Dialog.Input
          wrapperStyle={styles.wrapper}
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="darkgray"
          value={value}
          onChangeText={(text) => {
            onChangeText(text);
            setValue(text);
          }}
        ></Dialog.Input>
        <Dialog.Button label="Cancel" onPress={() => setVisible(false)} />
        <Dialog.Button
          label="Complete"
          onPress={() => isMatch(value) ? onPress() : Alert.alert("Invalid letter grade.")}
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
    backgroundColor: "ghostwhite",
    color: "black",
  },
  wrapper: {
    backgroundColor: "ghostwhite",
    borderColor: "black",
    borderWidth: 1,
  },
});
