import React, { ReactNode } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import { buttonStyles, typographyStyles } from "@/features/shared/styles";
import { buttonDanger } from "@/constants/button-types";

type Props = {
  text: string;
  icon: string | ReactNode;
  type?: "danger";
  loading?: boolean;
  onPressFn: Function;
};

export default function Component(props: Props) {
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
    if (props.loading) return;
    props.onPressFn();
    // if (loadingValue) return;
    // setLoading(true);
    // console.log(props.onPressFn);
    // props.onPressFn().finally(() => {
    //   setLoading(false);
    // });
  }
  return (
    <TouchableOpacity
      style={[
        buttonStyles.button,
        props.type === buttonDanger && buttonStyles.buttonDanger,
      ]}
      onPress={onPress}
    >
      {!props.loading && (
        <>
          <Text style={typographyStyles.buttonText}>{props.text}</Text>
          {renderIcon()}
        </>
      )}

      {props.loading && <ActivityIndicator />}
    </TouchableOpacity>
  );
}
