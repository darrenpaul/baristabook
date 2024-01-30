import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";

import appStyles from "@/constants/styles";

type HeaderProps = {
  text: string;
};

export default function Component(props: HeaderProps) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={appStyles.buttonSquare}
        onPress={() => router.back()}
      >
        <FontAwesome name="angle-left" size={24} color="white" />
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
