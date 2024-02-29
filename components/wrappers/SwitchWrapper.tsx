import React from "react";
import { Text, View, Switch } from "react-native";

import appStyles from "@/styles/styles";

type ComponentProps = {
  offText: string;
  onText: string;
  value: boolean;
  setFn: Function;
};

export default function Component({
  offText = "Off",
  onText = "On",
  value = false,
  setFn = () => {},
}: ComponentProps) {
  return (
    <View style={appStyles.rowSpacedContainer}>
      <Text
        style={{
          fontSize: 18,
          textTransform: "uppercase",
          color: value ? "gray" : "black",
          fontWeight: value ? "normal" : "bold",
        }}
      >
        {offText}
      </Text>

      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={value ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={(value) => setFn(value)}
        value={value}
      />

      <Text
        style={{
          fontSize: 18,
          textTransform: "uppercase",
          color: value ? "black" : "gray",
          fontWeight: value ? "bold" : "normal",
        }}
      >
        {onText}
      </Text>
    </View>
  );
}
