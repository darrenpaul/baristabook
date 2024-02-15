import React from "react";
import { View, TouchableOpacity } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import { useRouter } from "expo-router";
import { accountViewRoute, recipeCreateRoute } from "@/constants/routes";
import styles from "./styles";

export default function Component() {
  const router = useRouter();

  function handlePress(route: string) {
    router.push(route);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <FontAwesome name="house" size={20} color="white" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handlePress(recipeCreateRoute.path)}
      >
        <FontAwesome name="file-lines" size={20} color="white" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handlePress(accountViewRoute.path)}
      >
        <FontAwesome name="person" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
}
