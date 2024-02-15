import { StyleSheet } from "react-native";
import { marginStyles, containerStyles } from "@/features/shared/styles/index";

export default StyleSheet.create({
  container: {
    ...containerStyles.row,
    ...marginStyles.horizontalGutter,
    marginTop: 12,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    backgroundColor: "black",
    borderRadius: 25,
  },
});
