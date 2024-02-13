import { StyleSheet } from "react-native";

export const containerStyles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
  columnContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
});

export const paddingStyles = StyleSheet.create({
  horizontal: {
    paddingHorizontal: 20,
  },
});

export const cardStyles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    overflow: "hidden",
    width: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  body: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
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
  pageContentContainer: {
    display: "flex",
    gap: 24,
    paddingHorizontal: 20,
    paddingBottom: 48,
  },
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
  buttonSecondary: {
    borderRadius: 10,
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderWidth: 2,
    borderColor: "black",
  },
  buttonSecondaryText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
    marginRight: 12,
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
    marginTop: 12,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  textInput: {
    height: 50,
    borderWidth: 0.5,
    borderRadius: 10,
    padding: 12,
    borderColor: "gray",
  },
  textInputError: {
    borderColor: "red",
    borderWidth: 2,
  },
  areaInput: {
    height: 120,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 10,
    padding: 12,
  },
  textDisabled: {
    color: "lightgray",
  },
  textSecondary: {
    color: "gray",
  },
});
