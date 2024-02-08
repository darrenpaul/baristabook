import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Slider from "@react-native-community/slider";
import * as Haptics from "expo-haptics";
import TextInputModal from "@/components/modals/TextInputModal";
import appStyles from "@/constants/styles";

type GrindProps = {
  title: string;
  minValue: number;
  maxValue: number;
  measurement: string;
  value: number;
  setFn: Function;
  disableCustomInput?: boolean;
};

export default function Component(props: GrindProps) {
  const [modalVisibilityValue, setModalVisibility] = useState(false);

  function handleValueChange(value: string | number) {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    props.setFn(Number(value));
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            textTransform: "uppercase",
          }}
        >
          {props.title}
        </Text>

        <TouchableOpacity
          disabled={props.disableCustomInput}
          style={[
            appStyles.buttonStretchSmall,
            props.disableCustomInput && appStyles.buttonDisabled,
          ]}
          onPress={() => setModalVisibility(true)}
        >
          <Text style={appStyles.buttonText}>
            {props.value}
            {props.measurement}
          </Text>
        </TouchableOpacity>

        <TextInputModal
          visible={modalVisibilityValue}
          hideFn={() => setModalVisibility(false)}
          title="Custom Amount"
          placeholder="Enter amount"
          initialValue={props.value}
          onSaveFn={props.setFn}
          inputType="numeric"
        />
      </View>

      <Slider
        style={{ width: "100%", height: 40 }}
        value={props.value}
        onValueChange={handleValueChange}
        step={1}
        minimumValue={props.minValue}
        maximumValue={props.maxValue}
        minimumTrackTintColor="#000000"
        maximumTrackTintColor="#000000"
      />

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 14,
            color: "gray",
          }}
        >
          {props.minValue}
          {props.measurement}
        </Text>

        <Text
          style={{
            fontSize: 14,
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

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
  },
});
