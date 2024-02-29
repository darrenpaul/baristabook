import { StyleSheet } from "react-native";

export const paddingStyles = StyleSheet.create({
  horizontal: {
    paddingHorizontal: 20,
  },
});

export const accordionStyles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
  },
});

export default StyleSheet.create({
  columnSpacedContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "red",
    gap: 12,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  rowCenterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  rowSpacedContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  buttonGroupHorizontal: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  accordionContent: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  textDisabled: {
    color: "lightgray",
  },
  textSecondary: {
    color: "gray",
  },
});
