import { StyleSheet } from "react-native";

export const cardStyles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
  },
  image: {
    overflow: "hidden",
    width: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  body: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    alignItems: "center",
    gap: 8,
  },
  actions: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
  },
  date: {
    fontSize: 14,
    color: "gray",
  },
  button: {
    borderRadius: 10,
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "black",
    borderWidth: 2,
    borderColor: "black",
    gap: 8,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
