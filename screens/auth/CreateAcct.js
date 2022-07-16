import React, { useState, useEffect } from "react";
import {
  Alert,
  View,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from "react-native";
import supabase from "../../lib/supabase";
import { Image } from "react-native-elements";
import styles from "./CreateAcct.style";
import "react-native-url-polyfill/auto";
import AuthButton from "../../components/auth/AuthButton";
import UserInput from "../../components/auth/UserInput";
import PasswordSecureInput from "../../components/auth/PasswordSecureInput";
import { ScrollView } from "react-native-gesture-handler";

const CreateAcct = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({});

  useEffect(() => {
    return () => {
      setState({});
    };
  }, []);

  const signUp = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      setLoading(false);
    } else if (username == "") {
      alert("Username can't be empty!");
      setLoading(false);
    } else {
      setLoading(true);
      const { error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error) Alert.alert(error.message);

      try {
        const user = supabase.auth.user();
        const updates = {
          id: user.id,
          username,
          updated_at: new Date(),
        };

        let { error } = await supabase.from("profiles").upsert(updates);
        if (error) {
          throw error;
        }

        const experienceUpdates = {
          id: user.id,
          updated_at: new Date().toISOString().toLocaleString(),
        };

        let { experienceError } = await supabase
          .from("experience")
          .upsert(experienceUpdates);
        if (experienceError) {
          throw experienceError;
        }
      } catch (error) {
        alert(error.message);
      }

      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require("../../assets/logo_trans.png")}
            />
            <Image
              style={styles.title}
              source={require("../../assets/title_trans.png")}
            />
          </View>
          <UserInput
            label="Email"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
          <UserInput
            label="Username"
            onChangeText={(text) => setUsername(text)}
            value={username}
          />
          <PasswordSecureInput
            password={password}
            onChangeText={(text) => setPassword(text)}
            placeholder="Password"
          />
          <PasswordSecureInput
            password={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            placeholder="Confirm Password"
          />
          <AuthButton
            textInput={"Create Account"}
            loading={loading}
            onPressFunc={signUp}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default CreateAcct;
