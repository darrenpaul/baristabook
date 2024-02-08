import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import * as Haptics from "expo-haptics";
import styles from "./styles";

import appStyles from "@/constants/styles";

type Item = { label: string; value: string | number };

type DropdownActionButtonProps = {
  value: string;
  setFn: Function;
  items: Item[];
  icon: string;
  placeholder: string;
  buttonFn: Function;
};

export default function Component(props: DropdownActionButtonProps) {
  const [isFocus, setIsFocus] = useState(false);

  function handlePress() {
    if (props.buttonFn) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      props.buttonFn();
    }
  }

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 12,
      }}
    >
      <Dropdown
        style={[styles.dropdown, isFocus && styles.dropdownFocused]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        data={props.items}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={props.placeholder}
        value={props.value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item: Item) => {
          props.setFn(item.value);
          setIsFocus(false);
        }}
        renderLeftIcon={() => (
          <FontAwesome
            style={styles.icon}
            color={isFocus ? "blue" : "black"}
            name={props.icon}
            size={20}
          />
        )}
      />

      <TouchableOpacity style={appStyles.buttonSquare} onPress={handlePress}>
        <FontAwesome name="angle-right" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}
