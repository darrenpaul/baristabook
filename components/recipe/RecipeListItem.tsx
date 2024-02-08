import React from "react";
import { View, Text, StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome6";

type Props = {
  icon: string;
  title: string;
  body?: string;
  uppercaseBody?: boolean;
  bodyUnderTitle?: boolean;
};

export default function Component({
  icon,
  title,
  body,
  uppercaseBody = true,
  bodyUnderTitle = false,
}: Props) {
  return (
    <View
      style={
        bodyUnderTitle ? styles.columnContainer : styles.rowSpacedContainer
      }
    >
      <View style={styles.rowContainer}>
        <FontAwesome name={icon} size={18} color="black" />
        <Text style={styles.titleText}>{title}</Text>
      </View>

      <Text style={[styles.text, !uppercaseBody && styles.textCapitalize]}>
        {body}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  rowSpacedContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  columnContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: 8,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  titleText: {
    fontSize: 16,
    textTransform: "uppercase",
  },
  text: {
    fontSize: 20,
    textTransform: "uppercase",
  },
  textCapitalize: {
    textTransform: "capitalize",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
