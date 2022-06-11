import {
  KeyboardAvoidingView,
  Keyboard,
  View,
  Text,
  Alert,
} from "react-native";
import { useState } from "react";
import { Input } from "react-native-elements";
import styles from "./GoalEditor.style";
import { useRoute } from "@react-navigation/native";
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native-gesture-handler";

export default GoalSetter = ({ navigation }) => {
  const route = useRoute();
  const { user, routeName, defaultType } = route.params;
  const [value, setValue] = useState("");
  const [type, setType] = useState(defaultType);
  const [description, setDescription] = useState("");

  const submitGoal = async (value, type, description) => {
    const { data, error } = await supabase.from("goals").insert([
      {
        user_id: user.id,
        content: value,
        type: type,
        description: description,
      },
    ]);

    if (error) Alert.alert(error);
    // setData((prevGoal) => {
    //   return [
    //     {
    //       value: data[0].content,
    //       key: data[0].id,
    //       type: data[0].type,
    //     },
    //     ...prevGoal,
    //   ];
    // });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <View style={styles.formContainer}>
            <View style={styles.verticallySpaced}>
              <Input
                style={styles.textInput}
                label="Goal"
                value={value}
                onChangeText={(text) => setValue(text)}
              />
            </View>
            <View style={styles.verticallySpaced}>
              <Input
                style={styles.textInput}
                label="Description"
                value={description}
                onChangeText={(text) => setDescription(text)}
              />
            </View>
            <View style={styles.verticallySpaced}>
              <Input
                style={styles.textInput}
                label="Type"
                value={type}
                onChangeText={(text) => setType(text)}
              />
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  if (value == "") Alert.alert("Goal cannot be empty!");
                  else {
                    submitGoal(value, type, description);
                    navigation.navigate(routeName);
                  }
                }}
              >
                <Text style={styles.buttonText}>Set</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
