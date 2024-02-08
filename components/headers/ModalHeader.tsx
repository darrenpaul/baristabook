import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import * as Haptics from "expo-haptics";

import appStyles from "@/constants/styles";

type HeaderProps = {
  text: string;
  hideFn: Function;
};

export default function Component(props: HeaderProps) {
  function handlePress() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    props.hideFn();
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={appStyles.buttonSquare} onPress={handlePress}>
        <FontAwesome name="xmark" size={24} color="white" />
      </TouchableOpacity>

      <Text style={styles.header}>{props.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 44,
    fontWeight: "bold",
  },
});
