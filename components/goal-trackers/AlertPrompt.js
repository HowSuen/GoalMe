import { Alert } from "react-native";

export default AlertPrompt = (title, onPress) => {
  return Alert.alert(title, "", [
    {
      text: "Cancel",
    },
    {
      text: "Yes",
      onPress: onPress,
    },
  ]);
};