import { Alert } from "react-native";

export default AlertPrompt = ({ title, description, proceedText, onPress }) => {
  return Alert.alert(title, description || "", [
    {
      text: "Cancel",
    },
    {
      text: proceedText || "Yes",
      onPress: onPress,
    },
  ]);
};
