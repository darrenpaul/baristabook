import React from "react";
import { TextInput, View } from "react-native";
import appStyles from "@/features/shared/styles/styles";
import { User } from "@/types/user";
import AccordionWrapper from "@/features/shared/components/wrappers/AccordionWrapper";
import { inputStyles } from "@/features/shared/styles";

type ComponentProps = {
  user: User;
  setFn: Function;
  disabled?: boolean;
};

export default function Component(props: ComponentProps) {
  return (
    <AccordionWrapper title="Information" disabled={false}>
      <View style={appStyles.accordionContent}>
        <TextInput
          editable={false}
          autoComplete="email"
          inputMode="email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          style={[inputStyles.textInput]}
          value={props.user.email}
          placeholder="Email"
        />
      </View>
    </AccordionWrapper>
  );
}
