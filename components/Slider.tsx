import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Slider from "@react-native-community/slider";
import * as Haptics from "expo-haptics";

type GrindProps = {
  title: string;
  minValue: number;
  maxValue: number;
  measurement: string;
  value: number;
  setFn: Function;
};

export default function Component(props: GrindProps) {
  function handleValueChange(value: number) {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    props.setFn(value);
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

        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          {props.value}
          {props.measurement}
        </Text>
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
