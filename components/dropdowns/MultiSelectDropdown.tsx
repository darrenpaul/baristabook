import React, { useState } from "react";
import { MultiSelect } from "react-native-element-dropdown";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import styles from "./styles";

type Item = { label: string; value: string };

type DropdownActionButtonProps = {
  value: string[];
  setFn: Function;
  items: Item[];
  icon: string;
  placeholder: string;
};

export default function Component(props: DropdownActionButtonProps) {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <MultiSelect
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
      onChange={(item) => {
        props.setFn(item);
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
  );
}
