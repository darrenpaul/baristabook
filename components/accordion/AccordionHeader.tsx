import React from "react";
import { Text, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import appStyles, { accordionStyles } from "@/constants/styles";

type ComponentProps = {
  title: string;
  active: boolean;
  disabled?: boolean;
};

export default function Component(props: ComponentProps) {
  return (
    <View style={accordionStyles.header}>
      <Text
        style={[
          accordionStyles.heading,
          props.disabled && appStyles.textDisabled,
        ]}
      >
        {props.title}
      </Text>

      <FontAwesome
        name={props.active ? "eye" : "eye-slash"}
        size={24}
        color={props.disabled ? "lightgray" : "black"}
      />
    </View>
  );
}
