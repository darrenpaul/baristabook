import { StyleSheet } from "react-native";
import { marginStyles, containerStyles } from "@/features/shared/styles/index";

export default StyleSheet.create({
  container: {
    ...containerStyles.row,
    ...marginStyles.horizontalGutter,
    marginTop: 8,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    gap: 4,
  },
});
