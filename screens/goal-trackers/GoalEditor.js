import { KeyboardAvoidingView, Keyboard, View, Text } from "react-native";
import { useState } from "react";
import { Input } from "react-native-elements";
import styles from "./GoalEditor.style";
import { useRoute } from "@react-navigation/native";
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native-gesture-handler";

export default GoalEditor = ({ navigation }) => {
  const route = useRoute();
  const { routeName, goal } = route.params;
  const [content, setContent] = useState(goal.content);
  const [description, setDescription] = useState(goal.description);
  const [type, setType] = useState(goal.type);
  const [difficulty, setDifficulty] = useState(goal.difficulty);

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

  const updateGoal = async (key) => {
    try {
      let { data, error } = await supabase
        .from("goals")
        .update({
          content: content,
          description: description,
          difficulty: difficulty,
        })
        .match({ id: key });

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
      <View>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Input
              style={styles.textInput}
              label="Goal"
              value={content}
              onChangeText={(text) => setContent(text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Input
              style={styles.textInput}
              label="Description"
              placeholder="Add an optional description..."
              placeholderTextColor="lightgray"
              value={description}
              onChangeText={(text) => setDescription(text)}
            />
          </View>
          <View style={styles.dropdownContainer}>
            <Text style={styles.dropdownLabel}>Type</Text>
            <GoalDropdownList
              value={type}
              items={types}
              onValueChange={(value) => setType(value)}
              placeholder={{ label: "Select a type...", value: null }}
              disabled={true}
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
              style={styles.button}
              onPress={() => {
                updateGoal(goal.key);
                navigation.navigate(routeName);
              }}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
