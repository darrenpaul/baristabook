import React from "react";
import { Text, View } from "react-native";
import typographyStyles from "@/features/shared/styles/typography";
import containerStyles from "@/features/shared/styles/containers";

type ComponentProps = {
  title: string;
  active: boolean;
  disabled?: boolean;
};

export default function Component(props: ComponentProps) {
  return (
    <View style={containerStyles.header}>
      <Text
        style={[
          typographyStyles.heading,
          props.disabled && typographyStyles.disabled,
        ]}
      >
        {props.title}
      </Text>
    </View>
  );
}
