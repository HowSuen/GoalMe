import React, { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";
import { StyleSheet, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Auth from "./screens/Auth";
import Account from "./screens/Account";

const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222222",
  },
});
