import React, { useState, useEffect } from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import { supabase } from "../lib/supabase";
import { Input, Text, Image } from "react-native-elements";
import styles from "./Auth.style";
import "react-native-url-polyfill/auto";

const CreateAcct = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({});

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
          />
        </View>
        <View style={styles.verticallySpaced}>
          <Input
            style={styles.textInput}
            label="Username"
            leftIcon={{
              type: "font-awesome",
              name: "envelope",
              color: "white",
            }}
            onChangeText={(text) => setUsername(text)}
            value={username}
            placeholder="BarryTheBee"
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
          style={styles.button}
          disabled={loading}
          onPress={() => signUp()}
        >
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateAcct;
