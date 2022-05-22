import React, { useState, useEffect } from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import { supabase } from "../lib/supabase";
import { Button, Input, Text, Image } from "react-native-elements";
import styles from "./Auth.style";
import "react-native-url-polyfill/auto";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({});

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

  const signUpWithEmail = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          style={styles.textInput}
          label="Email"
          leftIcon={{ type: "font-awesome", name: "envelope", color: "white" }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={"none"}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          style={styles.textInput}
          label="Password"
          leftIcon={{ type: "font-awesome", name: "lock", color: "white" }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={"none"}
        />
      </View>
      <TouchableOpacity 
        style={[styles.mt20, styles.signInButton]}
        disabled={loading}
        onPress={() => signInWithEmail()}>
        <Text style={styles.signInText}>Sign in</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.signUpButton}
        disabled={loading}
        onPress={() => signUpWithEmail()}>
        <Text style={styles.signUpText}>No account yet? Sign up</Text>
      </TouchableOpacity>
      </View>
  );
};

export default Auth;
