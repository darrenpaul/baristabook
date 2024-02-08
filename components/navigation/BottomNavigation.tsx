import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import * as Haptics from "expo-haptics";
import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { recipeCreateRoute } from "@/constants/routes";

export default function Component() {
  const router = useRouter();

  function handlePress(route: string) {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    router.push(route);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <FontAwesome name="house" size={24} color="white" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handlePress(recipeCreateRoute.path)}
      >
        <FontAwesome name="file-lines" size={24} color="white" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <FontAwesome name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    margin: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 25,
    overflow: "hidden",
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 44,
  },
});
