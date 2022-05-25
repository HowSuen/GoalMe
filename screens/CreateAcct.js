import React, { useState, useEffect } from "react";
import {
  Alert,
  View,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { supabase } from "../lib/supabase";
import { Image } from "react-native-elements";
import styles from "./CreateAcct.style";
import "react-native-url-polyfill/auto";
import AuthButton from "../components/authentication/AuthButton";
import PasswordInput from "../components/authentication/PasswordInput";
import UserInput from "../components/authentication/UserInput";

const CreateAcct = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({});
  const [passVisible, setVisible] = useState(true);

  useEffect(() => {
    return () => {
      setState({});
    };
  }, []);

  const signUp = async () => {
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
    } catch (error) {
      alert(error.message);
    }

    setLoading(false);
  };

  const onIconPress = () => {
    setVisible(!passVisible);
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={styles.container}
      keyboardVerticalOffset={50}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require("../assets/goalme-transparent-logo.png")}
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
          <PasswordInput
            password={password}
            passVisible={passVisible}
            onChangeText={(text) => setPassword(text)}
            onIconPress={onIconPress}
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
