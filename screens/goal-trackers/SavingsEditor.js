import {
  KeyboardAvoidingView,
  Alert,
  View,
  Text,
  Keyboard,
  Dimensions,
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
    return (
      "$" +
      num
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
        .replace(".00", "")
    );
  };

  const floatFormat = (value) => {
    const num = parseFloat(value.replace(",", ""), 10);
    return num.toString();
  };

  const updateSaving = async (saving) => {
    try {
      let { error } = await supabase
        .from("savings")
        .update({
          name: name,
          description: description,
          amount: floatFormat(amount),
          curr_amount: floatFormat(curr_amount),
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
          curr_amount: floatFormat(new_amount),
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
              color="rgb(255,176,58)"
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
                    <Text style={styles.savedNumber}>
                      {currencyFormat(amount)}
                    </Text>
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
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Input
              style={styles.textInput}
              inputContainerStyle={styles.inputContainer}
              containerStyle={{
                width: (Dimensions.get("window").width / 10) * 6,
                maxWidth: Dimensions.get("window").width - 160,
              }}
              label="Goal"
              placeholder="Edit goal name..."
              placeholderTextColor="darkgray"
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <Input
              keyboardType="numeric"
              style={styles.textInput}
              inputContainerStyle={styles.inputContainer}
              containerStyle={{
                width: (Dimensions.get("window").width / 10) * 4,
                minWidth: 160,
              }}
              label="Saving Target ($)"
              placeholder="Add amount..."
              placeholderTextColor="darkgray"
              onChangeText={(value) => setAmount(value)}
              value={amount}
            />
          </View>
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
                <Text style={styles.buttonText}>Edit Savings</Text>
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
