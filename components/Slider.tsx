import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Slider from "@react-native-community/slider";
import * as Haptics from "expo-haptics";
import TextInputModal from "@/components/modals/TextInputModal";
import { useModal } from "@/services/modal-service";
import {
  buttonStyles,
  containerStyles,
  inputStyles,
  typographyStyles,
} from "@/features/shared/styles";

type Props = {
  title: string;
  minValue?: number;
  maxValue?: number;
  measurement?: string;
  value?: number;
  setFn: Function;
  step?: number;
  disableCustomInput?: boolean;
};

export default function Component(props: Props) {
  const { modalState, setModalState } = useModal();

  function handleValueChange(value: string | number) {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    props.setFn(Number(value));
  }

  return (
    <View
      style={[
        containerStyles.column,
        inputStyles.textInput,
        {
          gap: 0,
          height: "auto",
        },
      ]}
    >
      <View style={[containerStyles.row]}>
        <Text
          style={{
            textTransform: "uppercase",
          }}
        >
          {props.title}
        </Text>

        <TouchableOpacity
          disabled={props.disableCustomInput}
          style={[
            buttonStyles.buttonStretchSmall,
            props.disableCustomInput && buttonStyles.buttonDisabled,
          ]}
          onPress={() => setModalState(true)}
        >
          <Text style={typographyStyles.buttonText}>
            {props.value}
            {props.measurement}
          </Text>
        </TouchableOpacity>

        <TextInputModal
          visible={modalState}
          hideFn={() => setModalState(false)}
          title="Custom Amount"
          placeholder="Enter amount"
          initialValue={props.value}
          onSaveFn={(value: string) => props.setFn(Number(value))}
          inputType="numeric"
        />
      </View>

      <Slider
        style={{ width: "100%", height: 40 }}
        value={props.value}
        onValueChange={handleValueChange}
        step={props.step || 1}
        minimumValue={props.minValue || 0}
        maximumValue={props.maxValue || 10}
        minimumTrackTintColor="#000000"
        maximumTrackTintColor="#000000"
      />

      <View style={containerStyles.row}>
        <Text
          style={{
            fontSize: 12,
            color: "gray",
          }}
        >
          {props.minValue}
          {props.measurement}
        </Text>

        <Text
          style={{
            fontSize: 12,
            color: "gray",
          }}
        >
          {props.maxValue}
          {props.measurement}
        </Text>
      </View>
    </View>
  );
}
