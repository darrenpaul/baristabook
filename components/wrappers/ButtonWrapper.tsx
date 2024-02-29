import React, { ReactNode } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import { buttonStyles, typographyStyles } from "@/styles";
import { buttonDanger, buttonSecondary } from "@/constants/button-types";

type Props = {
  text?: string;
  icon?: string | ReactNode;
  type?: "danger" | "secondary";
  square?: boolean;
  loading?: boolean;
  disabled?: boolean;
  onPressFn: Function;
};

export default function Component(props: Props) {
  function renderIcon() {
    if (props.icon) {
      if (typeof props.icon === "string") {
        return (
          <FontAwesome
            name={props.icon}
            size={20}
            color={props.type === buttonSecondary ? "black" : "white"}
          />
        );
      }
      return <View style={{ marginLeft: 8 }}>{props.icon}</View>;
    }
    return;
  }

  function onPress() {
    if (props.loading) return;
    props.onPressFn();
  }
  return (
    <TouchableOpacity
      disabled={props.disabled}
      style={[
        props.square ? buttonStyles.buttonSquare : buttonStyles.button,
        props.type === buttonDanger && buttonStyles.buttonDanger,
        props.type === buttonSecondary && buttonStyles.buttonSecondary,
        props.disabled && buttonStyles.buttonDisabled,
      ]}
      onPress={onPress}
    >
      {!props.loading && (
        <>
          {props.text && (
            <Text
              style={[
                typographyStyles.buttonText,
                props.type === buttonSecondary &&
                  typographyStyles.buttonSecondaryText,
              ]}
            >
              {props.text}
            </Text>
          )}

          {renderIcon()}
        </>
      )}

      {props.loading && <ActivityIndicator />}
    </TouchableOpacity>
  );
}
