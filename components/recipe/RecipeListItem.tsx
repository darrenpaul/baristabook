import React, { ReactNode } from "react";
import { View, Text, StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import { Taste } from "@/components/icons";

type Props = {
  icon: ReactNode;
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
  function renderIcon() {
    if (icon) {
      if (typeof icon === "string") {
        return (
          <View>
            <FontAwesome name={icon} size={18} color="black" />
          </View>
        );
      }
      return <View style={{ marginRight: 8 }}>{icon}</View>;
    }
    return <View></View>;
  }

  return (
    <View
      style={
        bodyUnderTitle ? styles.columnContainer : styles.rowSpacedContainer
      }
    >
      <View style={styles.rowContainer}>
        {renderIcon()}

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
