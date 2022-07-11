import { useState, useEffect } from "react";
import supabase from "../../lib/supabase";
import {
  View,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
} from "react-native";
import { Input, Text } from "react-native-elements";
import styles from "./Account.style";
import "react-native-url-polyfill/auto";
import SavedAvatar from "../../components/game/SavedAvatar";
import { ScrollView } from "react-native-gesture-handler";

const Account = ({ navigation, session }) => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [avatar_url, setAvatarUrl] = useState("");

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  const getProfile = async () => {
    try {
      setLoading(true);
      const user = supabase.auth.user();
      if (!user) throw new Error("No user on the session!");

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url`)
        .eq("id", user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      Alert.alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async ({ username, avatar_url }) => {
    try {
      setLoading(true);
      const user = supabase.auth.user();
      if (!user) throw new Error("No user on the session!");

      const updates = {
        id: user.id,
        username,
        avatar_url,
        updated_at: new Date(),
      };

      let { error } = await supabase
        .from("profiles")
        .upsert(updates, { returning: "minimal" });

      if (error) {
        throw error;
      }
    } catch (error) {
      Alert.alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={{ backgroundColor: "ghostwhite" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <ImageBackground
              resizeMode="cover"
              source={require("../../assets/coins_bg.jpg")}
            >
              <View style={styles.avatarContainer}>
                <SavedAvatar size={250} session={session}/>
                <TouchableOpacity
                  style={styles.avatarButton}
                  onPress={() =>
                    navigation.navigate("Profile", {
                      screen: "CustomiseAvatar",
                    })
                  }
                >
                  <Text style={[styles.buttonText, { color: "#333333", fontSize: 15 }]}>
                    Customise
                  </Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
            <View style={styles.formContainer}>
              <View style={styles.verticallySpaced}>
                <Input
                  style={styles.textInput}
                  inputContainerStyle={{ borderBottomColor: "transparent" }}
                  containerStyle={{ marginBottom: -10 }}
                  label="Email"
                  value={session?.user?.email}
                  disabled
                />
              </View>
              <View style={styles.verticallySpaced}>
                <Input
                  style={styles.textInput}
                  containerStyle={{ marginBottom: -10 }}
                  label="Username"
                  value={username || ""}
                  onChangeText={(text) => setUsername(text)}
                />
              </View>
              <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                  style={styles.button}
                  disabled={loading}
                  onPress={() => updateProfile({ username, avatar_url })}
                >
                  <Text style={styles.buttonText}>
                    {loading ? "Loading ..." : "Update"}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => supabase.auth.signOut()}
                >
                  <Text style={styles.buttonText}>Sign Out</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default Account;
