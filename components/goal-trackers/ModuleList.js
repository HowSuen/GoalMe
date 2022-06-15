import React from "react";
import { Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import styles from "./ModuleList.style";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";
import DialogPrompt from "./DialogPrompt";
import { useState } from "react";

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
            description="What letter grade did you receive for this module?"
            placeholder="Enter grade here..."
            onChangeText={onChangeText}
            onPress={() => completeModule(module)}
            visible={visible}
            setVisible={setVisible}
          />
        </TouchableOpacity>
        <View>
          <Text style={styles.listText}>{module.moduleCode}</Text>
          <View style={styles.listSubtextContainer}>
            <Text style={styles.listSubtext}>
              Target Grade: {module.targetGrade}
            </Text>
            <Text style={styles.listSubtext}>
              Difficulty: {module.difficulty}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => deleteModule(module)}
        >
          <FontAwesome name="trash" size={25} color="black" />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};
