import {
  KeyboardAvoidingView,
  View,
  Text,
  Alert,
  Keyboard,
} from "react-native";
import { useState } from "react";
import { Input } from "react-native-elements";
import styles from "./GoalSetter.style";
import { useRoute } from "@react-navigation/native";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import GoalDropdownList from "../../components/goal-trackers/GoalDropdownList";

export default GoalSetter = ({ navigation }) => {
  const route = useRoute();
  const { user, routeName, defaultType } = route.params;
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState(defaultType);
  const [difficulty, setDifficulty] = useState("None");

  const types = [
    { label: "General", value: "General" },
    { label: "Academic", value: "Academic" },
    { label: "Fitness", value: "Fitness" },
    { label: "Finance", value: "Finance" },
  ];

  const difficulties = [
    { label: "None", value: "None" },
    { label: "Easy", value: "Easy" },
    { label: "Medium", value: "Medium" },
    { label: "Hard", value: "Hard" },
  ];

  const submitGoal = async () => {
    try {
      const { data, error } = await supabase.from("goals").insert([
        {
          user_id: user.id,
          content: content,
          description: description,
          type: type,
          difficulty: difficulty,
        },
      ]);
      if (error) throw error;
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.formContainer}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Input
            style={styles.textInput}
            inputContainerStyle={styles.inputContainer}
            label="Goal"
            placeholder="Add a goal..."
            placeholderTextColor="darkgray"
            value={content}
            onChangeText={(text) => setContent(text)}
          />
          <Input
            style={styles.textInput}
            inputContainerStyle={styles.inputContainer}
            label="Description"
            placeholder="Add an optional description..."
            placeholderTextColor="darkgray"
            value={description}
            onChangeText={(text) => setDescription(text)}
            multiline={true}
            maxHeight={160}
          />
        </TouchableWithoutFeedback>
        <View style={styles.dropdownContainer}>
          <Text style={styles.dropdownLabel}>Type</Text>
          <GoalDropdownList
            value={type}
            items={types}
            onValueChange={(value) => setType(value)}
            placeholder={{ label: "Select a type...", value: null }}
          />
        </View>
        <View style={styles.dropdownContainer}>
          <Text style={styles.dropdownLabel}>Difficulty</Text>
          <GoalDropdownList
            value={difficulty}
            items={difficulties}
            onValueChange={(value) => setDifficulty(value)}
            placeholder={{ label: "Select a difficulty...", value: null }}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={content == "" ? styles.disabledButton : styles.button}
            disabled={content == ""}
            onPress={() => {
              submitGoal();
              navigation.navigate(routeName);
            }}
          >
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
