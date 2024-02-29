import { StyleSheet } from "react-native";

export default StyleSheet.create({
  button: {
    flex: 1,
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "black",
    borderWidth: 2,
    borderColor: "black",
    gap: 8,
  },
  buttonSecondary: {
    backgroundColor: "white",
  },
  buttonDanger: {
    backgroundColor: "red",
    borderColor: "red",
  },
  buttonSquare: {
    borderRadius: 10,
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "black",
  },
  buttonSquareSmall: {
    borderRadius: 10,
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "black",
  },
  buttonStretchSmall: {
    borderRadius: 10,
    minWidth: 36,
    height: 36,
    paddingHorizontal: 6,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "black",
  },
  buttonDisabled: {
    backgroundColor: "lightgray",
    borderColor: "lightgray",
  },
});
