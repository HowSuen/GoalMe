import {
  KeyboardAvoidingView,
  View,
  Text,
  Alert,
  Keyboard,
} from "react-native";
import { useState } from "react";
import { Input } from "react-native-elements";
import styles from "./ModuleSetter.style";
import { useRoute } from "@react-navigation/native";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";

export default ModuleSetter = ({ navigation }) => {
  const route = useRoute();
  const { user, routeName } = route.params;
  const [link, setLink] = useState("");
  const [moduleName, setModuleName] = useState("");

  const submitModules = async () => {
    if (link.substring(0, 42) != "https://nusmods.com/timetable/sem-1/share?") {
      return Alert.alert("Invalid link.");
    }

    let mods = []
      .concat(link.match(/\?.+?(?=\=)/g))
      .concat(link.match(/&\w*/g))
      .map((s) => s.substring(1));

    try {
      let promise;
      for (let i = 0; i < mods.length; i++) {
        let { data, error } = await supabase.from("modules").insert([
          {
            user_id: user.id,
            module_code: mods[i],
            target_grade: "A",
          },
        ]);
        if (error) throw error;
        promise = data[0];
      }
      return promise;
    } catch (error) {
      Alert.alert(error.message);
    }
  };

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
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.formContainer}>
          <View style={styles.instructionContainer}>
            <Text style={styles.instructionTitle}>Instructions</Text>
            <Text style={styles.instructionText}>
              Import your modules by going to {"\n"}
              NUSMods → Share/Sync → Copy Link, {"\n"}
              or add your own module.
            </Text>
          </View>
          <Input
            style={styles.textInput}
            inputContainerStyle={styles.inputContainer}
            label="Link"
            placeholder="Paste your link from NUSMods here..."
            placeholderTextColor="darkgray"
            value={link}
            onChangeText={(text) => setLink(text)}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={link == "" ? styles.disabledButton : styles.button}
              disabled={link == ""}
              onPress={() => {
                submitModules().then(() => navigation.navigate(routeName));
              }}
            >
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
          </View>
          <Input
            style={styles.textInput}
            inputContainerStyle={styles.inputContainer}
            label="Module"
            placeholder="Or add your module here..."
            placeholderTextColor="darkgray"
            value={moduleName}
            onChangeText={(text) => setModuleName(text)}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={moduleName == "" ? styles.disabledButton : styles.button}
              disabled={moduleName == ""}
              onPress={() => {
                submitModule().then(() => navigation.navigate(routeName));
              }}
            >
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
