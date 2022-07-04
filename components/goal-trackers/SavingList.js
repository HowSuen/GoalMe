import React from "react";
import { Text, View, StyleSheet } from "react-native";
import {
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";
import { Bar } from "react-native-progress";

export default SavingList = ({
  saving,
  completeSaving,
  deleteSaving,
  navigation,
}) => {
  const route = useRoute();
  const savingText = saving.name;

  const calculateProgress = (saving) => {
    const curr = saving.curr_amount;
    const total = saving.amount;
    return curr / total;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.listContainer}
        onPress={() =>
          navigation.navigate("SavingEditor", {
            routeName: route.name,
            saving: saving,
          })
        }
      >
        <TouchableOpacity
          style={styles.boxContainer}
          onPress={() => completeSaving(saving)}
        >
          <FontAwesome name="square-o" size={25} color={"black"} />
        </TouchableOpacity>
        <View>
          <Text style={styles.listText}>
            {savingText.substring(0, 16) +
              (savingText.length > 16 ? "..." : "")}
          </Text>
          <Bar
            progress={calculateProgress(saving)}
            width={null}
            height={16}
            unfilledColor="lightgray"
            color={"gold"}
            borderWidth={1}
            animationConfig={{ bounciness: 5 }}
          />
          <View style={styles.progressText}>
            <Text style={styles.listText}>{saving.curr_amount}</Text>
            <Text style={styles.listText}>{saving.amount}</Text>
          </View>
        </View>
        <View style={styles.iconContainer}>
          <FontAwesome
            name="repeat"
            size={15}
            color={exercise.recurring ? "white" : "transparent"}
          />
          <TouchableOpacity
            style={styles.trashContainer}
            onPress={() => deleteSaving(saving)}
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
    marginTop: 25,
  },
  listContainer: {
    height: "auto",
    width: 350,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#cc99ff",
  },
  boxContainer: {
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
  progressText: {
    flexDirection: "row",
    justifyContent: "space-between",
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
