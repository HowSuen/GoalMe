import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  Platform,
  TouchableOpacity,
  View,
} from "react-native";
import { Card, Text, Image } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import styles from "./ProgressChecker.style";

export default ProgressChecker = ({ navigation }) => {
  const isFocused = useIsFocused();

  const [state, setState] = useState({});

  useEffect(() => {
    return () => {
      setState({});
    };
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* <Card
        containerStyle={{
          padding: Platform.OS == "ios" ? 5 : 0,
          borderRadius: 10,
          backgroundColor: "mediumseagreen",
          elevation: 10,
          borderColor: "mediumseagreen",
          marginVertical: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("GoalsProgress")}
          style={styles.cardContainer}
        >
          <Image
            style={styles.cardIcon}
            source={require("../../assets/goals-progress.png")}
          />
          <Text style={styles.cardText}>Goals</Text>
        </TouchableOpacity>
      </Card> */}
        <TouchableOpacity
          style={{ marginVertical: 10, borderRadius: 10, elevation: 5 }}
          onPress={() => navigation.navigate("GoalsProgress")}
        >
          <ImageBackground
            resizeMode="cover"
            source={require("../../assets/green_mountain.jpeg")}
            imageStyle={{ borderRadius: 10 }}
          >
            <View style={[styles.cardContainer, { alignItems: "flex-end" }]}>
              {/* <Image
              style={styles.cardIcon}
              source={require("../../assets/goals-progress.png")}
            /> */}
              <Text
                style={[
                  styles.cardText,
                  {
                    backgroundColor: "mediumseagreen",
                    borderRadius: 10,
                    overflow: "hidden",
                  },
                ]}
              >
                Goals
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
        {/* <Card
        containerStyle={{
          padding: Platform.OS == "ios" ? 5 : 0,
          borderRadius: 10,
          backgroundColor: "#27A4F2",
          elevation: 10,
          borderColor: "#27A4F2",
          marginVertical: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("ModulesProgress")}
          style={styles.cardContainer}
        >
          <Image
            style={styles.cardIcon}
            source={require("../../assets/modules-progress.png")}
          />
          <Text style={styles.cardText}>Modules</Text>
        </TouchableOpacity>
      </Card> */}
        <TouchableOpacity
          style={{ marginVertical: 10, borderRadius: 10, elevation: 5 }}
          onPress={() => navigation.navigate("ModulesProgress")}
        >
          <ImageBackground
            resizeMode="cover"
            source={require("../../assets/books_bg.jpeg")}
            imageStyle={{ borderRadius: 10 }}
          >
            <View style={[styles.cardContainer, { alignItems: "flex-start" }]}>
              {/* <Image
              style={styles.cardIcon}
              source={require("../../assets/modules-progress.png")}
            /> */}
              <Text
                style={[
                  styles.cardText,
                  {
                    backgroundColor: "#27A4F2",
                    borderRadius: 10,
                    overflow: "hidden",
                  },
                ]}
              >
                Modules
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
        {/* <Card
        containerStyle={{
          padding: Platform.OS == "ios" ? 5 : 0,
          borderRadius: 10,
          backgroundColor: "plum",
          elevation: 10,
          borderColor: "plum",
          marginVertical: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("ExercisesProgress")}
          style={styles.cardContainer}
        >
          <Image
            style={styles.cardIcon}
            source={require("../../assets/exercises-progress.png")}
          />
          <Text style={styles.cardText}>Exercises</Text>
        </TouchableOpacity>
      </Card> */}
        <TouchableOpacity
          style={{ marginVertical: 10, borderRadius: 10, elevation: 5 }}
          onPress={() => navigation.navigate("ExercisesProgress")}
        >
          <ImageBackground
            resizeMode="cover"
            source={require("../../assets/gym_bg.jpeg")}
            imageStyle={{ borderRadius: 10 }}
          >
            <View style={[styles.cardContainer, { alignItems: "flex-end" }]}>
              {/* <Image
            style={styles.cardIcon}
            source={require("../../assets/exercises-progress.png")}
          /> */}
              <Text
                style={[
                  styles.cardText,
                  {
                    backgroundColor: "hotpink",
                    borderRadius: 10,
                    overflow: "hidden",
                  },
                ]}
              >
                Exercises
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
        {/* <Card
        containerStyle={{
          padding: Platform.OS == "ios" ? 5 : 0,
          borderRadius: 10,
          backgroundColor: "rgb(255,176,58)",
          elevation: 10,
          borderColor: "rgb(255,176,58)",
          marginVertical: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("SavingsProgress")}
          style={styles.cardContainer}
        >
          <Image
            style={styles.cardIcon}
            source={require("../../assets/savings-progress.png")}
          />
          <Text style={styles.cardText}>Savings</Text>
        </TouchableOpacity>
      </Card> */}
        <TouchableOpacity
          style={{ marginVertical: 10, borderRadius: 10, elevation: 5 }}
          onPress={() => navigation.navigate("SavingsProgress")}
        >
          <ImageBackground
            resizeMode="cover"
            source={require("../../assets/money_bg.jpg")}
            imageStyle={{ borderRadius: 10 }}
          >
            <View style={[styles.cardContainer, { alignItems: "flex-start" }]}>
              {/* <Image
              style={styles.cardIcon}
              source={require("../../assets/savings-progress.png")}
            /> */}
              <Text
                style={[
                  styles.cardText,
                  {
                    backgroundColor: "rgb(255,176,58)",
                    borderRadius: 10,
                    overflow: "hidden",
                  },
                ]}
              >
                Savings
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
