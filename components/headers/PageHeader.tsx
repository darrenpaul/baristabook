import { View, Text, TouchableOpacity } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import {
  buttonStyles,
  containerStyles,
  typographyStyles,
  paddingStyles,
  marginStyles,
} from "@/styles";

type HeaderProps = {
  text: string;
};

export default function Component(props: HeaderProps) {
  const router = useRouter();

  function handlePress() {
    router.back();
  }

  return (
    <View
      style={[
        containerStyles.row,
        paddingStyles.horizontalGutter,
        marginStyles.bottomGutter,
      ]}
    >
      <TouchableOpacity style={buttonStyles.buttonSquare} onPress={handlePress}>
        <FontAwesome name="angle-left" size={24} color="white" />
      </TouchableOpacity>

      <Text style={typographyStyles.heading}>{props.text}</Text>
    </View>
  );
}
