import React from "react";
import { StyleSheet, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import appStyles from "@/styles/styles";

type DropdownActionButtonProps = {
  value: number;
};

export default function Component(props: DropdownActionButtonProps) {
  return (
    <View style={appStyles.rowContainer}>
      {[...Array(5)].map((_, index) => (
        <FontAwesome
          key={`rating${index}`}
          color="gold"
          name="star"
          size={24}
          solid={props.value > index}
        />
      ))}
    </View>
  );
}
