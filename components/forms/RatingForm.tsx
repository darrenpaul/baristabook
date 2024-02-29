import React from "react";
import { View, TouchableOpacity } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import { containerStyles, inputStyles } from "@/styles";

type Props = {
  value: number;
  setFn: Function;
};

export default function Component(props: Props) {
  return (
    <View
      style={[
        containerStyles.row,
        inputStyles.textInput,
        {
          height: "auto",
        },
      ]}
    >
      {[...Array(5)].map((_, index) => (
        <TouchableOpacity onPress={() => props.setFn(index + 1)} key={index}>
          <FontAwesome
            color="gold"
            name="star"
            size={48}
            solid={props.value > index}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}
