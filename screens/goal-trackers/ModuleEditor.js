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
import { grades } from "./Modules";

export default ModuleEditor = ({ navigation }) => {
  const route = useRoute();
  const { routeName, module } = route.params;
  const [targetGrade, setTargetGrade] = useState(module.targetGrade);

  const noStateChange = () => {
    return targetGrade == module.targetGrade;
  };

  const hasEmptyValues = () => {
    return targetGrade == null;
  };

  const updateModule = async (module) => {
    try {
      let { error } = await supabase
        .from("modules")
        .update({
          target_grade: targetGrade,
          updated_at: new Date().toISOString().toLocaleString(),
        })
        .match({ id: module.id });

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
          <Text style={styles.dropdownLabel}>Module</Text>
          <Text style={styles.moduleText}>{module.moduleCode}</Text>
          {/* <Input
            style={styles.textInput}
            inputContainerStyle={styles.inputContainer}
            label="Target Grade"
            value={targetGrade}
            onChangeText={(text) => setTargetGrade(text)}
          /> */}
        </TouchableWithoutFeedback>
        <View style={styles.dropdownContainer}>
          <Text style={styles.dropdownLabel}>Target Grade</Text>
          <GoalDropdownList
            value={targetGrade}
            items={grades}
            onValueChange={(value) => setTargetGrade(value)}
            placeholder={{ label: "Select a grade...", value: null }}
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
