import Dialog from "react-native-dialog";
import { View, StyleSheet, Alert, Platform } from "react-native";
import { BlurView } from "expo-blur";
import { useState, useEffect } from "react";
import { CheckBox, Text } from "react-native-elements";

export default SavingPrompt = ({
  numberRegex,
  updateCurrAmount,
  visible,
  setVisible,
}) => {
  const [value, setValue] = useState("");
  const [saving, setSaving] = useState(true);
  const [withdraw, setWithdraw] = useState(false);

  useEffect(() => {
    setValue("");
  }, [visible]);

  return (
    <View style={styles.container}>
      <Dialog.Container visible={visible} blurComponentIOS={blurComponentIOS}>
        <Dialog.Title>Save or Withdraw Money</Dialog.Title>
        <View style={{ flexDirection: "row" }}>
          <CheckBox
            title={
              Platform.OS == "ios" ? (
                <Text style={styles.checkBoxText}>Save</Text>
              ) : (
                "Save"
              )
            }
            checked={saving}
            checkedColor="green"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            onIconPress={() => {
              setSaving(true);
              setWithdraw(false);
            }}
            onPress={() => {
              setSaving(true);
              setWithdraw(false);
            }}
            containerStyle={
              Platform.OS == "ios" ? styles.checkBox : { minWidth: 110 }
            }
          />
          <CheckBox
            title={
              Platform.OS == "ios" ? (
                <Text style={styles.checkBoxText}>Withdraw</Text>
              ) : (
                "Withdraw"
              )
            }
            checked={withdraw}
            center
            checkedIcon="dot-circle-o"
            checkedColor="red"
            uncheckedIcon="circle-o"
            onIconPress={() => {
              setWithdraw(true);
              setSaving(false);
            }}
            onPress={() => {
              setWithdraw(true);
              setSaving(false);
            }}
            containerStyle={
              Platform.OS == "ios" ? styles.checkBox : { minWidth: 110 }
            }
          />
        </View>
        <Dialog.Input
          keyboardType="numeric"
          wrapperStyle={
            Platform.OS === "ios" ? styles.iosWrapper : styles.wrapper
          }
          style={Platform.OS === "ios" ? styles.iosInput : styles.input}
          placeholder="Enter Amount..."
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
          onPress={() =>
            numberRegex(value)
              ? updateCurrAmount(value, saving)
              : Alert.alert("Invalid amount")
          }
          disabled={value == "" || !numberRegex(value)}
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
  checkBox: {
    backgroundColor: "transparent",
    borderWidth: 0,
  },
  checkBoxText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 8,
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
