import React, { useState, useEffect } from "react";
import {
  Alert,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { supabase } from "../lib/supabase";
import { Text, Image } from "react-native-elements";
import styles from "./Auth.style";
import "react-native-url-polyfill/auto";
import AuthButton from "../components/authentication/AuthButton";
import PasswordInput from "../components/authentication/PasswordInput";
import UserInput from "../components/authentication/UserInput";

const Auth = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({});
  const [passVisible, setVisible] = useState(true);

  useEffect(() => {
    return () => {
      setState({});
    };
  }, []);

  const signInWithEmail = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signIn({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
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
          <View style={styles.formContainer}>
            <UserInput
              label="Email"
              onChangeText={(text) => setEmail(text)}
              value={email}
            />
            <PasswordInput
              password={password}
              passVisible={passVisible}
              onChangeText={(text) => setPassword(text)}
              onIconPress={onIconPress}
            />
            <AuthButton
              textInput={"Sign In!"}
              loading={loading}
              onPressFunc={signInWithEmail}
            />
            <TouchableOpacity
              style={styles.signUpButton}
              disabled={loading}
              onPress={() => navigation.navigate("Signup")}
            >
              <Text style={styles.signUpText}>No account yet? Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Auth;
