import { Alert } from "react-native";

export default AlertPrompt = (title, onPress) => {
  return Alert.alert(title, "", [
    {
      text: "Yes",
      onPress: onPress,
    },
    {
      text: "No",
    },
  ]);
};
