import {
  KeyboardAvoidingView,
  Alert,
  View,
  Text,
  Keyboard,
} from "react-native";
import { useEffect, useState } from "react";
import { Input } from "react-native-elements";
import styles from "./ModuleEditor.style";
import { useRoute } from "@react-navigation/native";
import {
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import GoalDropdownList from "../../components/goal-trackers/GoalDropdownList";
import { types, difficulties, recurrings } from "./GoalSetter";
import supabase from "../../lib/supabase";

let modules = [];

export default GoalEditor = ({ navigation }) => {
  const route = useRoute();
  const { routeName, goal } = route.params;
  const [content, setContent] = useState(goal.content);
  const [description, setDescription] = useState(goal.description);
  const [type, setType] = useState(goal.type);
  const [module, setModule] = useState(goal.module);
  const [difficulty, setDifficulty] = useState(goal.difficulty);
  const [recurring, setRecurring] = useState(goal.recurring);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getModules();
  }, []);

  const noStateChange = () => {
    return (
      content == goal.content &&
      description == goal.description &&
      type == goal.type &&
      module == goal.module &&
      difficulty == goal.difficulty &&
      recurring == goal.recurring
    );
  };

  const hasEmptyValues = () => {
    return (
      content == "" || type == null || difficulty == null || recurring == null
    );
  };

  const getModules = async () => {
    setLoading(true);
    const user = supabase.auth.user();
    try {
      let { data: mods, error } = await supabase
        .from("modules")
        .select("module_code, module_name")
        .match({
          user_id: user.id,
          completion_status: false,
        });

      if (error) throw error;

      modules = mods.map((object) => {
        return {
          label: object.module_code || object.module_name,
          value: object.module_code || object.module_name,
        };
      });
    } catch (error) {
      Alert.alert(error.message);
    }
    setLoading(false);
  };

  const updateGoal = async (goal) => {
    try {
      let { data, error } = await supabase
        .from("goals")
        .update({
          content: content,
          description: description,
          type: type,
          module: module,
          difficulty: difficulty,
          recurring: recurring,
          updated_at: new Date().toISOString().toLocaleString(),
        })
        .match({ id: goal.id });

      if (error) throw error;
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <ScrollView style={{ backgroundColor: "ghostwhite" }}>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.formContainer}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Input
              style={styles.textInput}
              inputContainerStyle={styles.inputContainer}
              label="Goal"
              value={content}
              onChangeText={(text) => setContent(text)}
            />
            <Input
              style={styles.textInput}
              inputContainerStyle={styles.inputContainer}
              label="Description"
              placeholder="Add an optional description..."
              placeholderTextColor="lightgray"
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
          {type == "Academic" && (
            <View style={styles.dropdownContainer}>
              <Text style={styles.dropdownLabel}>Module</Text>
              <GoalDropdownList
                value={type == "Academic" ? module : null}
                items={modules}
                onValueChange={(value) => setModule(value)}
                placeholder={{ label: "Select a module...", value: null }}
                disabled={loading || type != "Academic"}
              />
            </View>
          )}
          <View style={styles.dropdownContainer}>
            <Text style={styles.dropdownLabel}>Difficulty</Text>
            <GoalDropdownList
              value={difficulty}
              items={difficulties}
              onValueChange={(value) => setDifficulty(value)}
              placeholder={{ label: "Select a difficulty...", value: null }}
            />
          </View>
          <View style={styles.dropdownContainer}>
            <Text style={styles.dropdownLabel}>Recurring?</Text>
            <GoalDropdownList
              value={recurring}
              items={recurrings}
              onValueChange={(value) => setRecurring(value)}
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
                updateGoal(goal);
                navigation.navigate(routeName);
              }}
            >
              <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};
