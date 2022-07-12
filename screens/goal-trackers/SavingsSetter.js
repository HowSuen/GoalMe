import {
  KeyboardAvoidingView,
  View,
  Text,
  Alert,
  Keyboard,
} from "react-native";
import { useState } from "react";
import { Input } from "react-native-elements";
import styles from "./SavingsSetter.style";
import { useRoute } from "@react-navigation/native";
import {
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import AndroidTitle from "../../components/goal-trackers/AndroidTitle";

// const recurrings = [
//   { label: "No", value: false },
//   { label: "Yes", value: true },
// ];

export default SavingsSetter = ({ navigation }) => {
  const route = useRoute();
  const { user, routeName } = route.params;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  //   const [recurring, setRecurring] = useState(false);

  const floatFormat = (value) => {
    const num = parseFloat(value.replace(",", ""), 10);
    return num.toString();
  }

  const submitSaving = async () => {
    try {
      let { data, error } = await supabase.from("savings").insert([
        {
          user_id: user.id,
          name: name,
          description: description,
          amount: floatFormat(amount),
          curr_amount: 0,
          //   recurring: recurring,
        },
      ]);
      if (error) throw error;
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const hasEmptyValues = () => {
    return name == "" || amount == "" || !numberRegex(amount);
  };

  const numberRegex = (number) => {
    const regex = /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/;
    return regex.test(number);
  };

  return (
    <ScrollView style={styles.scrollview}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Input
            style={styles.textInput}
            inputContainerStyle={styles.inputContainer}
            label="Saving Goal"
            placeholder="Add a saving goal..."
            placeholderTextColor="darkgray"
            value={name}
            onChangeText={(text) => setName(text)}
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
          <Input
            keyboardType="numeric"
            style={styles.textInput}
            inputContainerStyle={styles.inputContainer}
            label="Saving Target ($)"
            placeholder="Add amount to save..."
            placeholderTextColor="darkgray"
            onChangeText={(value) => setAmount(value)}
            value={amount}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={hasEmptyValues() ? styles.disabledButton : styles.button}
              disabled={hasEmptyValues()}
              onPress={() => {
                submitSaving();
                navigation.navigate(routeName);
              }}
            >
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};
