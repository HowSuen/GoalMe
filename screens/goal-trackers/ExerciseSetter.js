import {
  KeyboardAvoidingView,
  View,
  Text,
  Alert,
  Keyboard,
} from "react-native";
import { useState } from "react";
import { Input } from "react-native-elements";
import styles from "./ExerciseSetter.style";
import { useRoute } from "@react-navigation/native";
import {
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import GoalDropdownList from "../../components/goal-trackers/GoalDropdownList";
import { Picker, onOpen } from "react-native-actions-sheet-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import minutes from "./timer/minutes.json";
import seconds from "./timer/seconds.json";

const types = [
  { label: "Run", value: "run" },
  { label: "Weight", value: "weight" },
];

const recurrings = [
  { label: "No", value: false },
  { label: "Yes", value: true },
];

export default ExerciseSetter = ({ navigation }) => {
  const route = useRoute();
  const { user, routeName } = route.params;

  const [type, setType] = useState("");
  const [exercise_name, setExerciseName] = useState("");
  const [description, setDescription] = useState("");
  const [recurring, setRecurring] = useState(false);

  const [distance, setDistance] = useState("0");
  const [min, setMin] = useState("0");
  const [sec, setSec] = useState("00");

  const [weight, setWeight] = useState("0");
  const [rep, setRep] = useState(0);
  const [set, setSet] = useState(0);

  const submitRun = async () => {
    try {
      let { data, error } = await supabase.from("exercises").insert([
        {
          user_id: user.id,
          type: type,
          exercise_name: exercise_name,
          description: description,
          distance: distance,
          min: min,
          sec: sec,
          recurring: recurring,
        },
      ]);
      if (error) throw error;
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const submitWeight = async () => {
    try {
      let { data, error } = await supabase.from("exercises").insert([
        {
          user_id: user.id,
          type: type,
          exercise_name: exercise_name,
          description: description,
          weight: weight,
          rep: rep,
          set: set,
          volume: calculateVolume(weight, rep, set),
          recurring: recurring,
        },
      ]);
      if (error) throw error;
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const hasEmptyValues = () => {
    return type == "run"
      ? exercise_name == "" ||
          distance == "0" ||
          !isFloat(distance) ||
          (min == "0" && sec == "00")
      : exercise_name == "" ||
          weight == "0" ||
          !isInteger(weight) ||
          rep == "0" ||
          !isInteger(rep) ||
          set == "0" ||
          !isInteger(set);
  };

  const isInteger = (number) => {
    return /^\d+$/.test(number);
  };

  const isFloat = (number) => {
    return /^(?!0\d)\d*(\.\d+)?$/.test(number);
  };

  const inputsInvalid = () => {
    return type == "run"
      ? isNaN(+distance)
      : isNaN(+weight) ||
          isNaN(+rep) ||
          isNaN(+set) ||
          parseInt(weight) != weight ||
          parseInt(rep) != rep ||
          parseInt(set) != set;
  };

  const calculateVolume = (weight, rep, set) => {
    const w = parseInt(weight, 10);
    const r = parseInt(rep, 10);
    const s = parseInt(set, 10);
    return (w * r * s).toString();
  };

  return (
    <ScrollView style={styles.scrollview}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.formContainer}>
          <Text style={styles.dropdownLabel}>Type of Exercise</Text>
          <GoalDropdownList
            value={type}
            items={types}
            onValueChange={(value) => setType(value)}
            placeholder={{ label: "Select type of exercise...", value: "" }}
          />
        </View>
        {type == "" ? (
          <View style={styles.defaultContainer}>
            <Text style={styles.defaultText}>Choose the type of Exercise!</Text>
            <View style={styles.exercise}>
              <TouchableOpacity onPress={() => setType("run")}>
                <MaterialCommunityIcons
                  name="weight-lifter"
                  size={80}
                  style={{ marginHorizontal: 20 }}
                  color="#cc99ff"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setType("weight")}>
                <MaterialCommunityIcons
                  name="run-fast"
                  size={80}
                  style={{ marginHorizontal: 20 }}
                  color="#ff6699"
                />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <Input
                style={styles.textInput}
                inputContainerStyle={styles.inputContainer}
                label="Title"
                placeholder="Add a title..."
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
              {type == "run" ? (
                <View style={styles.exercise}>
                  <View style={styles.inputContainerSmall}>
                    <Input
                      keyboardType="numeric"
                      style={styles.timerText}
                      inputContainerStyle={styles.inputContainer}
                      label="Distance"
                      placeholder="km"
                      placeholderTextColor="darkgray"
                      onChangeText={(value) => setDistance(value)}
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
                    />
                  </View>
                </View>
              )}
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={
                    hasEmptyValues() || inputsInvalid()
                      ? styles.disabledButton
                      : styles.button
                  }
                  disabled={hasEmptyValues() || inputsInvalid()}
                  onPress={() => {
                    type == "run" ? submitRun() : submitWeight();
                    navigation.navigate(routeName);
                  }}
                >
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        )}
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
