import Dialog from "react-native-dialog";
import { View, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";

export default LogoutPrompt = ({ logout, visible, setVisible }) => {
  return (
    <View style={styles.container}>
      <Dialog.Container visible={visible} blurComponentIOS={blurComponentIOS}>
        <Dialog.Title>Confirm Sign Out?</Dialog.Title>
        <Dialog.Button label="Cancel" onPress={() => setVisible(false)} />
        <Dialog.Button label="Yes" onPress={logout} />
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
