import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";
import DialogPrompt from "./DialogPrompt";
import { useState } from "react";

const grades = [
  { label: "A+", value: "A+" },
  { label: "A", value: "A" },
  { label: "A-", value: "A-" },
  { label: "B+", value: "B+" },
  { label: "B", value: "B" },
  { label: "B-", value: "B-" },
  { label: "C+", value: "C+" },
  { label: "C", value: "C" },
  { label: "C-", value: "C-" },
  { label: "D+", value: "D+" },
  { label: "D", value: "D" },
  { label: "F", value: "F" },
  { label: "F*", value: "F*" },
  // { label: "S", value: "S" },
  // { label: "U", value: "U" },
];

export default ExerciseList = ({
  exercise,
  completeExercise,
  deleteExercise,
  navigation,
}) => {
  const route = useRoute();
  const [visible, setVisible] = useState(false);
  const exerciseText = exercise.exercise_name;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.exerciseListContainer}
        onPress={() =>
          navigation.navigate("ExerciseEditor", {
            routeName: route.name,
            exercise: exercise,
          })
        }
      >
        <TouchableOpacity
          title=""
          onPress={() => setVisible(true)}
          style={styles.boxContainer}
        >
          <FontAwesome name="square-o" size={25} color={"black"} />
          <DialogPrompt
            title="Received Grade"
            description="What letter grade did you receive for this module?"
            placeholder="Enter grade here..."
            matches={grades}
            onChangeText={onChangeText}
            onPress={() => completeModule(exercise)}
            alertMessage={"Invalid letter grade."}
            visible={visible}
            setVisible={setVisible}
          />
        </TouchableOpacity>
        <View>
          <Text style={styles.listText}>
            {exerciseText.substring(0, 16) +
              (exerciseText.length > 16 ? "..." : "")}
          </Text>
          <Text style={styles.listSubtext}>
            Target Grade: {exercise.targetGrade}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => deleteModule(exercise)}
        >
          <FontAwesome5 name="trash" size={20} color="black" />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    height: "auto",
    width: "auto",
    marginTop: 25,
  },
  exerciseListContainer: {
    height: "auto",
    width: 350,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "deepskyblue",
  },
  boxContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 10,
    marginVertical: 17,
  },
  checkContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 10,
    marginVertical: 17,
  },
  listText: {
    color: "black",
    width: 260,
    height: "auto",
    fontSize: 20,
    marginTop: 5,
    marginBottom: 2,
    marginRight: 10,
  },
  listSubtext: {
    color: "black",
    fontSize: 12,
    marginBottom: 5,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    height: 40,
    borderRadius: 10,
  },
});
