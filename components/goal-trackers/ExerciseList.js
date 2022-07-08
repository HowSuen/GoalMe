import React from "react";
import { Text, View, StyleSheet } from "react-native";
import {
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";

export default ExerciseList = ({
  exercise,
  completeExercise,
  deleteExercise,
  navigation,
}) => {
  const route = useRoute();
  const exerciseText = exercise.exercise_name;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={
          exercise.type == "run"
            ? styles.runListContainer
            : styles.weightListContainer
        }
        onPress={() =>
          navigation.navigate("ExerciseEditor", {
            routeName: route.name,
            exercise: exercise,
          })
        }
      >
        <TouchableOpacity
          style={styles.boxContainer}
          onPress={() => completeExercise(exercise)}
        >
          <FontAwesome name="square-o" size={25} color={"black"} />
        </TouchableOpacity>
        <View>
          <Text style={styles.listText}>
            <MaterialCommunityIcons
              name={exercise.type == "run" ? "run-fast" : "weight-lifter"}
              size={20}
            />
            {" " +
              exerciseText.substring(0, 16) +
              (exerciseText.length > 16 ? "..." : "")}
          </Text>
          <Text style={styles.listSubtext}>
            {exercise.type == "run"
              ? "Distance: " +
                exercise.distance +
                "km; Time: " +
                exercise.min +
                ":" +
                exercise.sec
              : "Weight: " +
                exercise.weight +
                "kg; Reps: " +
                exercise.rep +
                "; Sets: " +
                exercise.set}
          </Text>
        </View>
        <View style={styles.iconContainer}>
          <FontAwesome
            name="repeat"
            size={15}
            color={exercise.recurring ? "white" : "transparent"}
          />
          <TouchableOpacity
            style={styles.trashContainer}
            onPress={() => deleteExercise(exercise)}
          >
            <FontAwesome5 name="trash" size={20} color="black" />
          </TouchableOpacity>
        </View>
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
    marginTop: 15,
  },
  runListContainer: {
    height: "auto",
    width: 350,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#cc99ff",
  },
  weightListContainer: {
    height: "auto",
    width: 350,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ff6699",
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
  },
  trashContainer: {
    marginTop: 10,
  },
});
