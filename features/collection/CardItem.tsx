import ButtonWrapper from "@/components/wrappers/ButtonWrapper";
import ImageWrapper from "@/components/wrappers/ImageWrapper";
import { cardStyles } from "@/features/index/styles/recipe-card";
import { Brewer } from "@/types/brewer";
import { Coffee } from "@/types/coffee";
import { Grinder } from "@/types/grinder";
import { Text, View } from "react-native";

type Props = {
  title: string;
  imageBucket?: string;
  imageUrl?: string;
  data: Coffee | Grinder | Brewer;
  setFn: Function;
};

export default function Component(props: Props) {
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
