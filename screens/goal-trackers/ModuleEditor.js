import {
  KeyboardAvoidingView,
  Alert,
  View,
  Text,
  Keyboard,
} from "react-native";
import { useState } from "react";
import { Input } from "react-native-elements";
import styles from "./ModuleEditor.style";
import { useRoute } from "@react-navigation/native";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import GoalDropdownList from "../../components/goal-trackers/GoalDropdownList";

const difficulties = [
  { label: "Easy", value: "Easy" },
  { label: "Medium", value: "Medium" },
  { label: "Hard", value: "Hard" },
];

export default ModuleEditor = ({ navigation }) => {
  const route = useRoute();
  const { routeName, module } = route.params;
  const [targetGrade, setTargetGrade] = useState(module.targetGrade);
  const [difficulty, setDifficulty] = useState(module.difficulty);

  const noStateChange = () => {
    return (
      targetGrade == module.targetGrade &&
      difficulty == module.difficulty
    );
  };

  const hasEmptyValues = () => {
    return targetGrade == "" || difficulty == null;
  };

  const updateModule = async (module) => {
    try {
      let { error } = await supabase
        .from("modules")
        .update({
          target_grade: targetGrade,
          difficulty: difficulty,
          updated_at: new Date().toISOString().toLocaleString(),
        })
        .match({ id: module.id });

      if (error) throw error;
      
      let { error: error1 } = await supabase
        .from("goals")
        .update({
          content: "Get " + targetGrade + " for " + module.moduleCode,
          difficulty: difficulty,
          updated_at: new Date().toISOString().toLocaleString(),
        })
        .match({ id: module.goalId });

      if (error1) throw error1;
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
          <Text style={styles.dropdownLabel}>Module</Text>
          <Text style={styles.moduleText}>{module.moduleCode}</Text>
          <Input
            style={styles.textInput}
            inputContainerStyle={styles.inputContainer}
            label="Target Grade"
            value={targetGrade}
            onChangeText={(text) => setTargetGrade(text)}
          />
        </TouchableWithoutFeedback>
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
            style={
              noStateChange() || hasEmptyValues()
                ? styles.disabledButton
                : styles.button
            }
            disabled={noStateChange() || hasEmptyValues()}
            onPress={() => {
              updateModule(module);
              navigation.navigate(routeName);
            }}
          >
            <Text style={styles.buttonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
