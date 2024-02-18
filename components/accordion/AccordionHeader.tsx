import React from "react";
import { Text, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import {
  containerStyles,
  marginStyles,
  typographyStyles,
} from "@/features/shared/styles";

type ComponentProps = {
  title: string;
  active: boolean;
  disabled?: boolean;
};

export default function Component(props: ComponentProps) {
  return (
    <View style={[containerStyles.header, marginStyles.bottomGutter]}>
      <Text
        style={[
          typographyStyles.heading,
          props.disabled && typographyStyles.disabled,
        ]}
      >
        {props.title}
      </Text>

      <FontAwesome
        name={props.active ? "angle-down" : "angle-up"}
        size={24}
        color={props.disabled ? "lightgray" : "black"}
      />
    </View>
  );
}
