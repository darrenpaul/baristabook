import { View, Text } from "react-native";
import { cardStyles } from "@/features/index/styles/recipe-card";
import ImageWrapper from "@/features/shared/components/wrappers/ImageWrapper";
import { Coffee } from "@/types/coffee";
import ButtonWrapper from "@/features/shared/components/wrappers/ButtonWrapper";
import { Grinder } from "@/types/grinder";
import { Brewer } from "@/types/brewer";

type HeaderProps = {
  title: string;
  imageBucket?: string;
  imageUrl?: string;
  data: Coffee | Grinder | Brewer;
  setFn: Function;
};

export default function Component(props: HeaderProps) {
  async function onPress() {
    props.setFn(props.data);
    return;
  }
  return (
    <View style={cardStyles.card}>
      {props.imageBucket && (
        <ImageWrapper
          imageBucket={props.imageBucket}
          imageUrl={props.imageUrl}
        />
      )}

      <View style={cardStyles.body}>
        <View style={cardStyles.content}>
          <Text style={cardStyles.heading}>{props.title}</Text>
        </View>

        <ButtonWrapper icon="angle-right" square onPressFn={onPress} />
      </View>
    </View>
  );
}
