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
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(false);

  const submitModules = async () => {
    setLoading(true);

    let mods = []
      .concat(link.match(/\?.+?(?=\=)/g))
      .concat(link.match(/&\w*/g))
      .map((s) => s.substring(1));

    try {
      for (let i = 0; i < mods.length; i++) {
        let { data, error } = await supabase.from("modules").insert([
          {
            user_id: user.id,
            module_code: mods[i],
            target_grade: "A",
          },
        ]);
        if (error) throw error;
      }
    } catch (error) {
      Alert.alert(error.message);
    } finally {
      setLoading(false);
      setAdded(true);
    }
  };

  const hasEmptyValues = () => {
    return link == "";
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.formContainer}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Input
            style={styles.textInput}
            inputContainerStyle={styles.inputContainer}
            label="Link"
            placeholder="Paste your NUSMods link..."
            placeholderTextColor="darkgray"
            value={link}
            onChangeText={(text) => setLink(text)}
          />
        </TouchableWithoutFeedback>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={
              hasEmptyValues() || added ? styles.disabledButton : styles.button
            }
            disabled={hasEmptyValues() || added}
            onPress={() => {
              submitModules();
            }}
          >
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={loading ? styles.disabledButton : styles.button}
            disabled={loading}
            onPress={() => navigation.navigate(routeName)}
          >
            <Text style={styles.buttonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
