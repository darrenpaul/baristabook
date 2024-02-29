import { StyleSheet } from "react-native";
import { paddingStyles, containerStyles } from "@/styles";

export default StyleSheet.create({
  container: {
    ...containerStyles.row,
    ...paddingStyles.horizontalGutter,
    paddingTop: 16,
    borderTopWidth: 1,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    gap: 4,
  },
});
