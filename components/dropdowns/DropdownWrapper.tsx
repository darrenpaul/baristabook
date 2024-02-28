import React, { useState, ReactNode } from "react";
import { Dropdown } from "react-native-element-dropdown";
import styles from "./styles";
import { View } from "react-native";

type Item = { label: string; value: string };

type DropdownActionButtonProps = {
  value: string | undefined;
  setFn: Function;
  items: Item[];
  icon: ReactNode;
  placeholder: string;
  dropdownStyle?: object;
};

export default function Component(props: DropdownActionButtonProps) {
  const [isFocus, setIsFocus] = useState(false);

  function renderIcon() {
    if (props.icon) {
      if (typeof props.icon === "string") {
        return <View></View>;
      }
      return <View style={{ marginRight: 8 }}>{props.icon}</View>;
    }
    return <View></View>;
  }

  return (
    <View>
      <Dropdown
        style={[
          styles.dropdown,
          props.dropdownStyle,
          isFocus && styles.dropdownFocused,
        ]}
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
        renderLeftIcon={renderIcon}
      />
    </View>
  );
}
