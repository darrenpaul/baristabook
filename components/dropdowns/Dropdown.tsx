import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import FontAwesome from "@expo/vector-icons/FontAwesome6";

type Item = { label: string; value: string };

type DropdownActionButtonProps = {
  value: string;
  setFn: Function;
  items: Item[];
  icon: string;
  placeholder: string;
};

export default function Component(props: DropdownActionButtonProps) {
  const [isFocus, setIsFocus] = useState(false);

  return (
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
  );
}

const styles = StyleSheet.create({
  dropdown: {
    flexGrow: 1,
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  dropdownFocused: {
    borderColor: "blue",
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
