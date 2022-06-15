import { Alert } from "react-native";

export default AlertPrompt = ({ title, proceedText, onPress }) => {
  return Alert.alert(title, "", [
    {
      text: "Cancel",
    },
    {
      text: proceedText || "Yes",
      onPress: onPress,
    },
  ]);
};
