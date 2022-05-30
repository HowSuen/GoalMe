import React from "react";
import { View, Text } from "react-native";
import UserInput from "../components/auth/UserInput";
import Avatar from "../components/game/Avatar";
import styles from "./CustomiseAvatar.style";

const CustomiseAvatar = ({ navigation, session }) => {
  return (
    <View style={styles.container}>
      <Text>{session?.user?.email}</Text>
      <Avatar />
    </View>
  );
};

export default CustomiseAvatar;
