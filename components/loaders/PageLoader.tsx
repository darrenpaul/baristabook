import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

type Props = {};

export default function Component(props: Props) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    marginTop: 50,
  },
});
