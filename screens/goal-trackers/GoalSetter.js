import {
  KeyboardAvoidingView,
  View,
  Text,
  Alert,
  Keyboard,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import { Input } from "react-native-elements";
import styles from "./GoalSetter.style";
import { useRoute } from "@react-navigation/native";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import GoalDropdownList from "../../components/goal-trackers/GoalDropdownList";

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

const recurrings = [
  { label: "No", value: false },
  { label: "Yes", value: true },
];

let modules = [];

export default GoalSetter = ({ navigation }) => {
  const route = useRoute();
  const { user, routeName, defaultType } = route.params;
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState(defaultType);
  const [difficulty, setDifficulty] = useState("None");
  const [recurring, setRecurring] = useState(false);
  const [module, setModule] = useState(null);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({});

  useEffect(() => {
    getModules();
    return () => {
      setState({});
    };
  }, []);

  const submitGoal = async () => {
    try {
      const { data, error } = await supabase.from("goals").insert([
        {
          user_id: user.id,
          content: content,
          description: description,
          type: type,
          difficulty: difficulty,
          recurring: recurring,
          module: module,
        },
      ]);
      if (error) throw error;
    } catch (error) {
      Alert.alert(error.message);
    }
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

  return (
    <ScrollView style={{ backgroundColor: "ghostwhite" }}>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
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
              style={hasEmptyValues() ? styles.disabledButton : styles.button}
              disabled={hasEmptyValues()}
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
    </ScrollView>
  );
};

export { types, difficulties, recurrings };
