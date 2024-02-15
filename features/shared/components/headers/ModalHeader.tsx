import { View, Text, TouchableOpacity } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import {
  containerStyles,
  typographyStyles,
  buttonStyles,
  paddingStyles,
  marginStyles,
} from "@/features/shared/styles/index";

type HeaderProps = {
  text: string;
  hideFn: Function;
};

export default function Component(props: HeaderProps) {
  function handlePress() {
    props.hideFn();
  }

  return (
    <View
      style={[
        containerStyles.row,
        paddingStyles.horizontalGutter,
        marginStyles.topGutter,
        marginStyles.bottomGutter,
      ]}
    >
      <TouchableOpacity style={buttonStyles.buttonSquare} onPress={handlePress}>
        <FontAwesome name="xmark" size={24} color="white" />
      </TouchableOpacity>

      <Text style={typographyStyles.heading}>{props.text}</Text>
    </View>
  );
}
