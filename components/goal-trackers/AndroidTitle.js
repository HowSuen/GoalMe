import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";

export default AndroidTitle = ({ title, onPress }) => {
  return Platform.OS === "ios" ? (
    <></>
  ) : (
    <View style={[styles.container, styles.elevation]}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <TouchableOpacity onPress={onPress}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  elevation: {
    elevation: 5,
    shadowColor: "black",
  },
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "ghostwhite",
    marginBottom: 5,
    flexDirection: "row-reverse",
  },
  titleText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
  },
  titleContainer: {
    width: "100%",
    marginLeft: -50,
  },
});
