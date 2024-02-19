import { View, Text } from "react-native";
import { cardStyles } from "@/features/index/styles/recipe-card";
import ImageWrapper from "@/features/shared/components/wrappers/ImageWrapper";
import { coffeeImagesBucket } from "@/constants/storage-buckets";
import { Coffee } from "@/types/coffee";
import ButtonWrapper from "@/features/shared/components/wrappers/ButtonWrapper";

type HeaderProps = {
  coffee: Coffee;
  setFn: Function;
};

export default function Component(props: HeaderProps) {
  async function onPress() {
    props.setFn(props.coffee);
    return;
  }
  return (
    <View style={cardStyles.card}>
      <ImageWrapper
        imageBucket={coffeeImagesBucket}
        imageUrl={props.coffee.image}
      />

      <View style={cardStyles.body}>
        <View style={cardStyles.content}>
          <Text style={cardStyles.heading}>{props.coffee.name}</Text>
        </View>
      </View>

      <View style={cardStyles.actions}>
        <ButtonWrapper text="View" icon="angle-right" onPressFn={onPress} />
      </View>
    </View>
  );
}
