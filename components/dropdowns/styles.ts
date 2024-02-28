import { StyleSheet } from "react-native";
import { inputStyles } from "@/features/shared/styles";

export default StyleSheet.create({
  dropdown: {
    ...inputStyles.textInput,
    flexGrow: 1,
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
