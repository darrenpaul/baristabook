import React, { useState, ReactNode } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import { buttonStyles, typographyStyles } from "@/features/shared/styles";
import { buttonDanger } from "@/constants/button-types";

type Props = {
  text: string;
  icon: string | ReactNode;
  type?: "danger";
  onPressFn: Function;
};

export default function Component(props: Props) {
  const [loadingValue, setLoading] = useState<boolean>(false);

  function renderIcon() {
    if (props.icon) {
      if (typeof props.icon === "string") {
        return <FontAwesome name={props.icon} size={20} color="white" />;
      }
      return <View style={{ marginLeft: 8 }}>{props.icon}</View>;
    }
    return <View></View>;
  }

  function onPress() {
    if (loadingValue) return;
    setLoading(true);
    console.log(props.onPressFn);
    props.onPressFn().finally(() => {
      setLoading(false);
    });
  }
  return (
    <TouchableOpacity
      style={[
        buttonStyles.button,
        props.type === buttonDanger && buttonStyles.buttonDanger,
      ]}
      onPress={onPress}
    >
      {!loadingValue && (
        <>
          <Text style={typographyStyles.buttonText}>{props.text}</Text>
          {renderIcon()}
        </>
      )}

      {loadingValue && <ActivityIndicator />}
    </TouchableOpacity>
  );
}
