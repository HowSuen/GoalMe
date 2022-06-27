import {
  KeyboardAvoidingView,
  View,
  Text,
  Alert,
  Keyboard,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { useState } from "react";
import { Input } from "react-native-elements";
import styles from "./ExerciseSetter.style";
import { useRoute } from "@react-navigation/native";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import GoalDropdownList from "../../components/goal-trackers/GoalDropdownList";

const types = [
  { label: "Run", value: "run" },
  { label: "Weight", value: "weight" },
];

export default ExerciseSetter = ({ navigation }) => {
  const route = useRoute();
  const { user, routeName } = route.params;
  const [type, setType] = useState("weight");
  const [exercise_name, setExerciseName] = useState("");
  const [description, setDescription] = useState("");

  const [distance, setDistance] = useState(0);
  const [time, setTime] = useState(0);
  const [weight, setWeight] = useState(0);
  const [rep, setRep] = useState(0);
  const [set, setSet] = useState(0);

  const submitModule = async () => {
    try {
      let { data, error } = await supabase.from("modules").insert([
        {
          user_id: user.id,
          module_name: moduleName,
          target_grade: "A",
        },
      ]);
      if (error) throw error;
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "padding"}
      style={styles.container}
    >
      <View style={styles.formContainer}>
        <Text style={styles.dropdownLabel}>Type of Exercise</Text>
        <GoalDropdownList
          value={type}
          items={types}
          onValueChange={(value) => setType(value)}
          placeholder={{ label: "Select type of exercise...", value: null }}
        />
      </View>
      <View>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Input
            style={styles.textInput}
            inputContainerStyle={styles.inputContainer}
            label="Exercise"
            placeholder="Add an exercise..."
            placeholderTextColor="darkgray"
            value={exercise_name}
            onChangeText={(text) => setExerciseName(text)}
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
          {type == "run" ? (
            selectRun(
              (value) => setDistance(value),
              (value) => setTime(value),
              (value) => setTime(value)
            )
          ) : (
            selectWeight(
              (value) => setWeight(value),
              (value) => setRep(value),
              (value) => setSet(value)
            )
          )}
        </TouchableWithoutFeedback>
      </View>
    </KeyboardAvoidingView>
  );
};

const selectRun = (onChangeText, onChangeText2, onChangeText3) => {
  return (
    <View style={styles.exercise}>
      <View style={styles.inputCOntainerSmall}>
        <Input
          keyboardType="number-pad"
          style={styles.textInput}
          inputContainerStyle={styles.inputContainer}
          label="Distance"
          placeholder="Distance (km)"
          placeholderTextColor="darkgray"
          onChangeText={onChangeText}
        />
      </View>
      <View style={styles.inputCOntainerSmall}>
        <Input
          keyboardType="number-pad"
          style={styles.textInput}
          inputContainerStyle={styles.inputContainer}
          label="Min"
          placeholder="Min"
          placeholderTextColor="darkgray"
          onChangeText={onChangeText2}
        />
      </View>
      <View style={styles.inputCOntainerSmall}>
        <Input
          keyboardType="number-pad"
          style={styles.textInput}
          inputContainerStyle={styles.inputContainer}
          label="Sec"
          placeholder="Sec"
          placeholderTextColor="darkgray"
          onChangeText={onChangeText3}
        />
      </View>
    </View>
  );
};

const selectWeight = (onChangeText, onChangeText2, onChangeText3) => {
  return (
    <View style={styles.exercise}>
      <View style={styles.inputCOntainerSmall}>
        <Input
          keyboardType="number-pad"
          style={styles.textInput}
          inputContainerStyle={styles.inputContainer}
          label="Weight"
          placeholder="Weight (kg)"
          placeholderTextColor="darkgray"
          onChangeText={onChangeText}
        />
      </View>
      <View style={styles.inputCOntainerSmall}>
        <Input
          keyboardType="number-pad"
          style={styles.textInput}
          inputContainerStyle={styles.inputContainer}
          label="Rep"
          placeholder="Rep"
          placeholderTextColor="darkgray"
          onChangeText={onChangeText2}
        />
      </View>
      <View style={styles.inputCOntainerSmall}>
        <Input
          keyboardType="number-pad"
          style={styles.textInput}
          inputContainerStyle={styles.inputContainer}
          label="Set"
          placeholder="Set"
          placeholderTextColor="darkgray"
          onChangeText={onChangeText3}
        />
      </View>
    </View>
  );
};