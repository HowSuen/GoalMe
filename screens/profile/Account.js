import { useState, useEffect } from "react";
import supabase from "../../lib/supabase";
import {
  View,
  Alert,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Input, Text } from "react-native-elements";
import styles from "./Account.style";
import "react-native-url-polyfill/auto";
import SavedAvatar from "../../components/game/SavedAvatar";
import UsernamePrompt from "../../components/auth/UsernamePrompt";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import LogoutPrompt from "../../components/auth/LogoutPrompt";

const Account = ({ navigation, session }) => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [avatar_url, setAvatarUrl] = useState("");
  const [promptVisible, setPromptVisible] = useState(false);
  const [logoutPrompt, setLogoutPrompt] = useState(false);

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

  const updateProfile = async (username) => {
    try {
      setLoading(true);
      const user = supabase.auth.user();
      if (!user) throw new Error("No user on the session!");

      const updates = {
        id: user.id,
        username,
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
    <View style={styles.container}>
      <ImageBackground
        resizeMode="stretch"
        source={require("../../assets/gradient_bg3-min.jpg")}
      >
        <View style={styles.avatarContainer}>
          <SavedAvatar size={250} session={session} />
          <TouchableOpacity
            style={styles.avatarButton}
            onPress={() =>
              navigation.navigate("Profile", {
                screen: "CustomiseAvatar",
              })
            }
          >
            <Text
              style={[styles.buttonText, { color: "#333333", fontSize: 15 }]}
            >
              Customise
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.verticallySpaced}>
            <Input
              inputContainerStyle={{ borderBottomColor: "transparent" }}
              containerStyle={{ marginBottom: -10 }}
              label="Email"
              value={session?.user?.email}
              disabled
              disabledInputStyle={{ paddingBottom: 5, opacity: 1 }}
            />
          </View>
          <View style={styles.verticallySpaced}>
            <Input
              inputContainerStyle={{ borderBottomColor: "transparent" }}
              containerStyle={{ marginVertical: -10 }}
              label="Username"
              value={username || ""}
              disabled
              disabledInputStyle={{ paddingBottom: 5, opacity: 1 }}
              rightIcon={() => (
                <TouchableOpacity
                  onPress={() => {
                    setPromptVisible(true);
                  }}
                >
                  <MaterialCommunityIcons
                    name="square-edit-outline"
                    size={24}
                  />
                </TouchableOpacity>
              )}
            />
            <UsernamePrompt
              defaultName={username}
              updateName={(value) => {
                setUsername(value);
                updateProfile(value);
                setPromptVisible(false);
              }}
              visible={promptVisible}
              setVisible={setPromptVisible}
            />
          </View>
          <View style={{ marginTop: 70, alignItems: "center" }}>
            <TouchableOpacity
              style={styles.signOutButton}
              onPress={() => setLogoutPrompt(true)}
              disabled={loading}
            >
              <Text style={styles.signOutText}>
                {loading ? "Loading..." : "Sign Out"}
              </Text>
            </TouchableOpacity>
            <LogoutPrompt
              logout={() => supabase.auth.signOut()}
              visible={logoutPrompt}
              setVisible={setLogoutPrompt}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Account;
