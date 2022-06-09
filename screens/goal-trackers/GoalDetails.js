import { KeyboardAvoidingView, Keyboard, View, Text } from "react-native";
import { useState } from "react";
import { Input } from "react-native-elements";
import styles from "./GoalDetails.style";
import { useRoute } from "@react-navigation/native";
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native-gesture-handler";

export default GoalDetails = ({ navigation }) => {
  const route = useRoute();
  const { item } = route.params;
  const [value, setValue] = useState(item.value);
  const [description, setDescription] = useState(item.description);

  const onChangeValue = (text) => {
    setValue(text);
  };

  const onChangeDescription = (text) => {
    setDescription(text);
  };

  const updateItem = async (key) => {
    const { data, error } = await supabase
      .from("goals")
      .update({ content: value, description: description })
      .match({ id: key });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <View style={styles.formContainer}>
            <View style={styles.verticallySpaced}>
              <Input
                style={styles.textInput}
                label="Goal"
                value={value}
                onChangeText={onChangeValue}
              />
            </View>
            <View style={styles.verticallySpaced}>
              <Input
                style={styles.textInput}
                label="Description"
                value={description}
                onChangeText={onChangeDescription}
              />
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  updateItem(item.key);
                  navigation.goBack();
                }}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
