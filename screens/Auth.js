import React, { useState, useEffect } from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import { supabase } from "../lib/supabase";
import { Input, Text, Image } from "react-native-elements";
import styles from "./Auth.style";
import "react-native-url-polyfill/auto";
import AuthButton from "../components/authentication/AuthButton";
import PasswordInput from "../components/authentication/PasswordInput";

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
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../assets/goalme-transparent-logo.png")}
        />
      </View>
      <View style={styles.formContainer}>
        <View style={styles.verticallySpaced}>
          <Input
            style={styles.textInput}
            label="Email"
            leftIcon={{
              type: "font-awesome",
              name: "envelope",
              color: "white",
            }}
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="email@address.com"
            autoCapitalize={"none"}
            keyboardType="email-address"
          />
        </View>
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
  );
};

export default Auth;
