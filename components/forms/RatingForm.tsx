import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome6";

type DropdownActionButtonProps = {
  value: number;
  setFn: Function;
};

export default function Component(props: DropdownActionButtonProps) {
  return (
    <View style={{}}>
      <Text style={styles.heading}>Rating</Text>

      <View style={styles.starContainer}>
        {[...Array(5)].map((_, index) => (
          <TouchableOpacity onPress={() => props.setFn(index + 1)} key={index}>
            <FontAwesome
              color="gold"
              name="star"
              size={48}
              solid={props.value > index}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  starContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
