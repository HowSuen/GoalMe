import React from "react";
import { Text, View } from "react-native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import styles from "./ModuleList.style";
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

export default ModuleList = ({
  module,
  completeModule,
  deleteModule,
  onChangeText,
  navigation,
}) => {
  const route = useRoute();
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.moduleListContainer}
        onPress={() =>
          navigation.navigate("ModuleEditor", {
            routeName: route.name,
            module: module,
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
            description="What grade did you receive for this module?"
            placeholder="Enter grade here..."
            matches={grades}
            onChangeText={onChangeText}
            onPress={() => completeModule(module)}
            visible={visible}
            setVisible={setVisible}
          />
        </TouchableOpacity>
        <View>
          <Text style={styles.listText}>{module.moduleCode}</Text>
          <Text style={styles.listSubtext}>
            Target Grade: {module.targetGrade}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => deleteModule(module)}
        >
          <FontAwesome5 name="trash" size={20} color="black" />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};
