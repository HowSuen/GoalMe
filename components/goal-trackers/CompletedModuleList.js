import React from "react";
import { Text, View } from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import styles from "./ModuleList.style";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";
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

export default CompletedModuleList = ({ module, redoModule, deleteModule }) => {
  const route = useRoute();
  const [visible, setVisible] = useState(false);
  const moduleText = module.moduleCode || module.moduleName;

  return (
    <View style={styles.container}>
      <View style={styles.moduleListContainer}>
        <TouchableOpacity
          style={styles.checkContainer}
          onPress={() => redoModule(module)}
        >
          <FontAwesome name="check-square-o" size={25} color="black" />
        </TouchableOpacity>
        <View>
          <Text style={styles.listText}>
            {moduleText.substring(0, 16) +
              (moduleText.length > 16 ? "..." : "")}
          </Text>
          <Text style={{ color: "black", fontSize: 12 }}>
            Received Grade: {module.gradeReceived}
          </Text>
          <Text style={styles.listSubtext}>
            Target Grade: {module.targetGrade}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => deleteModule(module)}
        >
          <Ionicons name="trash" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
