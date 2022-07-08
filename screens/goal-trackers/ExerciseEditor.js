import {
  KeyboardAvoidingView,
  Alert,
  View,
  Text,
  Keyboard,
} from "react-native";
import { useState } from "react";
import { Input } from "react-native-elements";
import { useRoute } from "@react-navigation/native";
import {
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "./ExerciseEditor.style";
import { Picker, onOpen } from "react-native-actions-sheet-picker";
import GoalDropdownList from "../../components/goal-trackers/GoalDropdownList";
import minutes from "./timer/minutes.json";
import seconds from "./timer/seconds.json";

const recurrings = [
  { label: "No", value: false },
  { label: "Yes", value: true },
];

export default ModuleEditor = ({ navigation }) => {
  const route = useRoute();
  const { routeName, exercise } = route.params;

  const [exercise_name, setExerciseName] = useState(exercise.exercise_name);
  const [description, setDescription] = useState(exercise.description);
  const [recurring, setRecurring] = useState(exercise.recurring);

  const [distance, setDistance] = useState(exercise.distance);
  const [min, setMin] = useState(exercise.min);
  const [sec, setSec] = useState(exercise.sec);

  const [weight, setWeight] = useState(exercise.weight);
  const [rep, setRep] = useState(exercise.rep);
  const [set, setSet] = useState(exercise.set);

  const noStateChange = () => {
    if (exercise.type == "run") {
      return (
        runNoStateChange() &&
        exercise_name == exercise.exercise_name &&
        description == exercise.description &&
        recurring == exercise.recurring
      );
    } else if (exercise.type == "weight") {
      return (
        weightNoStateChange() &&
        exercise_name == exercise.exercise_name &&
        description == exercise.description &&
        recurring == exercise.recurring
      );
    }
  };

  const runNoStateChange = () => {
    return (
      distance == exercise.distance &&
      min == exercise.min &&
      sec == exercise.sec
    );
  };

  const weightNoStateChange = () => {
    return (
      weight == exercise.weight && rep == exercise.rep && set == exercise.set
    );
  };

  const hasEmptyValues = () => {
    return exercise.type == "run"
      ? exercise_name == "" || distance == "0" || (min == "0" && sec == "00")
      : exercise_name == "" || weight == "0" || rep == "0" || set == "0";
  };

  const calculateVolume = (weight, rep, set) => {
    const w = parseFloat(weight, 10);
    const r = parseFloat(rep, 10);
    const s = parseFloat(set, 10);
    return (w * r * s).toString();
  };

  const updateRun = async (exercise) => {
    try {
      let { error } = await supabase
        .from("exercises")
        .update({
          exercise_name: exercise_name,
          description: description,
          distance: distance,
          min: min,
          sec: sec,
          updated_at: new Date().toISOString().toLocaleString(),
          recurring: recurring,
        })
        .match({ id: exercise.id });

      if (error) throw error;
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const updateWeight = async (exercise) => {
    try {
      let { error } = await supabase
        .from("exercises")
        .update({
          exercise_name: exercise_name,
          description: description,
          weight: weight,
          rep: rep,
          set: set,
          volume: calculateVolume(weight, rep, set),
          updated_at: new Date().toISOString().toLocaleString(),
          recurring: recurring,
        })
        .match({ id: exercise.id });

      if (error) throw error;
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <ScrollView style={styles.scrollview}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.formContainer}>
          <Text style={styles.dropdownLabel}>Type of Exercise</Text>
          <Text
            style={[
              styles.exerciseType,
              { color: exercise.type == "run" ? "#cc99ff" : "#ff6699" },
            ]}
          >
            {exercise.type == "run" ? "Run  " : "Weight  "}
            <MaterialCommunityIcons
              name={exercise.type == "run" ? "run-fast" : "weight-lifter"}
              size={24}
              color={exercise.type == "run" ? "#cc99ff" : "#ff6699"}
            />
          </Text>
        </View>
        <View>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Input
              style={styles.textInput}
              inputContainerStyle={styles.inputContainer}
              label="Title"
              placeholder="Edit title..."
              placeholderTextColor="darkgray"
              value={exercise_name}
              onChangeText={(text) => setExerciseName(text)}
            />
            <Input
              style={styles.textInput}
              inputContainerStyle={styles.inputContainer}
              label="Description"
              placeholder="Edit description..."
              placeholderTextColor="darkgray"
              value={description}
              onChangeText={(text) => setDescription(text)}
              multiline={true}
              maxHeight={160}
            />
          </TouchableWithoutFeedback>
          <View style={styles.dropdownContainer}>
            <Text style={styles.dropdownLabel}>Recurring?</Text>
            <GoalDropdownList
              value={recurring}
              items={recurrings}
              onValueChange={(value) => setRecurring(value)}
            />
          </View>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            {exercise.type == "run" ? (
              <View style={styles.exercise}>
                <View style={styles.inputContainerSmall}>
                  <Input
                    keyboardType="number-pad"
                    style={styles.timerText}
                    inputContainerStyle={styles.inputContainer}
                    label="Distance"
                    placeholder="km"
                    placeholderTextColor="darkgray"
                    onChangeText={(value) => setDistance(value)}
                    value={distance}
                  />
                </View>
                <View style={styles.timerContainer}>
                  <View style={styles.inputContainerSmall}>
                    <Text style={styles.dropdownLabel}>Minutes</Text>
                    <TouchableOpacity
                      onPress={() => {
                        onOpen("minutes");
                      }}
                      style={styles.timerButton}
                    >
                      <Text style={styles.timerText}>{min}</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.colon}>
                    <Text style={styles.timerText}>:</Text>
                  </View>
                  <View style={styles.inputContainerSmall}>
                    <Text style={styles.dropdownLabel}>Seconds</Text>
                    <TouchableOpacity
                      onPress={() => {
                        onOpen("seconds");
                      }}
                      style={styles.timerButton}
                    >
                      <Text style={styles.timerText}>{sec}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ) : (
              <View style={styles.exercise}>
                <View style={styles.inputContainerSmall}>
                  <Input
                    keyboardType="number-pad"
                    style={styles.timerText}
                    inputContainerStyle={styles.inputContainer}
                    label="Weight"
                    placeholder="kg"
                    placeholderTextColor="darkgray"
                    onChangeText={(value) => setWeight(value)}
                    value={weight}
                  />
                </View>
                <View style={styles.inputContainerSmall}>
                  <Input
                    keyboardType="number-pad"
                    style={styles.timerText}
                    inputContainerStyle={styles.inputContainer}
                    label="Reps"
                    placeholder="Reps"
                    placeholderTextColor="darkgray"
                    onChangeText={(value) => setRep(value)}
                    value={rep}
                  />
                </View>
                <View style={styles.inputContainerSmall}>
                  <Input
                    keyboardType="number-pad"
                    style={styles.timerText}
                    inputContainerStyle={styles.inputContainer}
                    label="Sets"
                    placeholder="Sets"
                    placeholderTextColor="darkgray"
                    onChangeText={(value) => setSet(value)}
                    value={set}
                  />
                </View>
              </View>
            )}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={
                  hasEmptyValues() || noStateChange()
                    ? styles.disabledButton
                    : styles.button
                }
                disabled={hasEmptyValues() || noStateChange()}
                onPress={() => {
                  exercise.type == "run"
                    ? updateRun(exercise)
                    : updateWeight(exercise);
                  navigation.navigate(routeName);
                }}
              >
                <Text style={styles.buttonText}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <Picker
          id="minutes"
          data={minutes}
          label="Select Minutes"
          setSelected={(min) => setMin(min.name)}
        />
        <Picker
          id="seconds"
          data={seconds}
          label="Select Seconds"
          setSelected={(min) => setSec(min.name)}
        />
      </KeyboardAvoidingView>
    </ScrollView>
  );
};
