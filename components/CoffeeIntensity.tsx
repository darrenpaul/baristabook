import React from "react";
import { StyleSheet, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome6";

type DropdownActionButtonProps = {
  value: number;
};

export default function Component(props: DropdownActionButtonProps) {
  return (
    <View style={styles.starContainer}>
      {[...Array(10)].map((_, index) => (
        <FontAwesome
          key={`coffeeIntensity${index}`}
          color={props.value > index ? "black" : "lightgrey"}
          name="mug-saucer"
          size={20}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  starContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
});
