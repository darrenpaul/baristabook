import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import {
  accountViewRoute,
  collectionViewRoute,
  homeRoute,
  recipeCreateRoute,
} from "@/constants/routes";
import styles from "./styles";
import { Settings, Home, CreateRecipe, Collection } from "@/components/icons";

export default function Component() {
  const router = useRouter();

  function handlePress(route: string) {
    router.push(route);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handlePress(homeRoute.path)}
      >
        <Home />
        <Text>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handlePress(recipeCreateRoute.path)}
      >
        <CreateRecipe />
        <Text>Create</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handlePress(collectionViewRoute.path)}
      >
        <Collection />
        <Text>Collection</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handlePress(accountViewRoute.path)}
      >
        <Settings />
        <Text>Settings</Text>
      </TouchableOpacity>
    </View>
  );
}
