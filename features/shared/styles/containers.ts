import { StyleSheet } from "react-native";

export default StyleSheet.create({
  page: {
    flex: 1,
  },
  pageContent: {
    display: "flex",
    gap: 16,
  },
  column: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  form: {
    display: "flex",
    gap: 12,
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
});
