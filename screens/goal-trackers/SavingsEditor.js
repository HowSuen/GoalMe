import {
  KeyboardAvoidingView,
  Alert,
  View,
  Text,
  Keyboard,
} from "react-native";
import { useState } from "react";
import { Input } from "react-native-elements";
import { useRoute } from "@react-navigation/native";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { Circle } from "react-native-progress";
import styles from "./SavingsEditor.style";
import SavingPrompt from "../../components/goal-trackers/SavingPrompt";

// const recurrings = [
//   { label: "No", value: false },
//   { label: "Yes", value: true },
// ];

export default SavingsEditor = ({ navigation }) => {
  const route = useRoute();
  const { routeName, saving } = route.params;
  const [name, setName] = useState(saving.name);
  const [description, setDescription] = useState(saving.description);
  const [amount, setAmount] = useState(saving.amount);
  const [curr_amount, setCurrAmount] = useState(saving.curr_amount);
  // const [recurring, setRecurring] = useState(saving.recurring);
  const [promptVisible, setPromptVisible] = useState(false);

  // const noStateChange = () => {
  //   return (
  //     name == saving.name &&
  //     description == saving.description &&
  //     amount == saving.amount &&
  //   //   recurring == saving.recurring &&
  //     curr_amount == saving.curr_amount
  //   );
  // };

  const hasEmptyValues = () => {
    return name == "" || amount == "" || !numberRegex(amount);
  };

  const numberRegex = (number) => {
    const regex = /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/;
    return regex.test(number);
  };

  const calculateProgress = () => {
    const curr = parseFloat(curr_amount.replace(",", ""), 10);
    const total = parseFloat(amount.replace(",", ""), 10);
    if (curr >= total) {
      return 1;
    } else if (curr <= 0) {
      return 0;
    } else {
      return curr / total;
    }
  };

  const isNegative = (amt) => {
    return parseFloat(amt.replace(",", ""), 10) < 0;
  };

  const convertInteger = (percentage) => {
    return Math.round(percentage * 100);
  };

  const calculateRemaining = () => {
    const curr = parseFloat(curr_amount.replace(",", ""), 10);
    const total = parseFloat(amount.replace(",", ""), 10);
    if (curr >= total) {
      return "0";
    }
    const remaining = total - curr;
    return remaining.toString();
  };

  const calculateAbsolute = (number) => {
    const num = parseFloat(number.replace(",", ""), 10);
    const abs = Math.abs(num);
    return abs.toString();
  };

  const currencyFormat = (str) => {
    const num = parseFloat(str.replace(",", ""), 10);
    return "$" + num.toPrecision().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  const currencyFormatWithoutS = (str) => {
    const num = parseFloat(str.replace(",", ""), 10);
    return num.toPrecision().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  const updateSaving = async (saving) => {
    try {
      let { error } = await supabase
        .from("savings")
        .update({
          name: name,
          description: description,
          amount: currencyFormatWithoutS(amount),
          curr_amount: curr_amount,
          updated_at: new Date().toISOString().toLocaleString(),
          // recurring: recurring,
        })
        .match({ id: saving.id });

      if (error) throw error;
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const updateSavingCurrAmount = async (saving, new_amount) => {
    try {
      let { error } = await supabase
        .from("savings")
        .update({
          curr_amount: new_amount,
          updated_at: new Date().toISOString().toLocaleString(),
          // recurring: recurring,
        })
        .match({ id: saving.id });

      if (error) throw error;
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const sumAmount = (add, amt) => {
    const additional_amt = parseFloat(add.replace(",", ""), 10);
    const original_amt = parseFloat(amt.replace(",", ""), 10);
    const total_amt = additional_amt + original_amt;
    return total_amt.toString();
  };

  const minusAmount = (minus, amt) => {
    const minus_amt = parseFloat(minus.replace(",", ""), 10);
    const original_amt = parseFloat(amt.replace(",", ""), 10);
    const total_amt = original_amt - minus_amt;
    return total_amt.toString();
  };

  return (
    <ScrollView style={styles.scrollview}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <View style={styles.progressContainer}>
            <Circle
              progress={calculateProgress()}
              color="darkorange"
              size={300}
              thickness={10}
            />
            <View style={styles.circleContainer}>
              <Text style={styles.circlePercentage}>
                {convertInteger(calculateProgress())}%
              </Text>
              <View style={styles.goalContainer}>
                <View style={styles.savedContainer}>
                  <Text style={styles.savedText}>SAVED</Text>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.savedNumber}>
                      {isNegative(curr_amount) ? "-" : ""}
                    </Text>
                    <Text style={styles.savedNumber}>
                      {currencyFormat(calculateAbsolute(curr_amount))}
                    </Text>
                  </View>
                </View>
                <View style={styles.savedContainer}>
                  <Text style={styles.savedText}>GOAL</Text>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.savedNumber}>$</Text>
                    <TextInput
                      keyboardType="numeric"
                      style={styles.savedNumber}
                      onChangeText={setAmount}
                      value={amount}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.remainingContainer}>
                <View style={styles.savedContainer}>
                  <Text style={styles.remainingText}>REMAINING</Text>
                  <Text style={styles.remainingNumber}>
                    {currencyFormat(calculateRemaining())}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <Input
            style={styles.textInput}
            inputContainerStyle={styles.inputContainer}
            label="Goal"
            placeholder="Edit goal name..."
            placeholderTextColor="darkgray"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <Input
            style={styles.textInput}
            inputContainerStyle={styles.inputContainer}
            label="Description"
            placeholder="Edit description..."
            placeholderTextColor="darkgray"
            value={description}
            onChangeText={(text) => setDescription(text)}
            multiline={true}
            maxHeight={120}
          />
          <View style={styles.goalContainer}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setPromptVisible(true);
                }}
              >
                <Text style={styles.buttonText}>Edit Saving</Text>
                <SavingPrompt
                  numberRegex={numberRegex}
                  updateCurrAmount={(value, isSaving) => {
                    let new_amount = "0";
                    if (isSaving) {
                      new_amount = sumAmount(value, curr_amount);
                    } else {
                      new_amount = minusAmount(value, curr_amount);
                    }
                    setCurrAmount(new_amount);
                    updateSavingCurrAmount(saving, new_amount);
                    setPromptVisible(false);
                  }}
                  visible={promptVisible}
                  setVisible={setPromptVisible}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={hasEmptyValues() ? styles.disabledButton : styles.button}
                disabled={hasEmptyValues()}
                onPress={() => {
                  updateSaving(saving);
                  navigation.navigate(routeName);
                }}
              >
                <Text style={styles.buttonText}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};
