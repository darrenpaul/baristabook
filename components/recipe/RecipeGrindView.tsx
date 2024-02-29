import React from "react";
import { View } from "react-native";
import appStyles from "@/styles/styles";
import { grindImagesBucket } from "@/constants/storage-buckets";
import { Recipe } from "@/types/recipe";
import RecipeListItem from "@/components/recipe/RecipeListItem";
import ImageWrapper from "@/components/wrappers/ImageWrapper";
import { weightConversionWithSymbol } from "@/utils/conversion-calculator";
import { Preferences } from "@/types/user";
import { Notes, Scale, GrindSize, Timer } from "@/components/icons";
import AccordionWrapper from "@/components/wrappers/AccordionWrapper";

type Props = {
  recipe: Recipe;
  preferences: Preferences;
};

export default function Component(props: Props) {
  return (
    <AccordionWrapper title="Grinder" disabled={false}>
      <View style={appStyles.accordionContent}>
        <ImageWrapper
          imageBucket={grindImagesBucket}
          imageUrl={props.recipe.grind_image}
        />

        <RecipeListItem
          icon={<GrindSize />}
          title="Size"
          body={props.recipe.grind_size}
        />

        <RecipeListItem
          icon={<Timer />}
          title="Grind Time"
          uppercaseBody={false}
          body={`${props.recipe.grind_duration}s`}
        />

        <RecipeListItem
          icon={<Scale />}
          title="Weight"
          uppercaseBody={false}
          body={weightConversionWithSymbol(
            props.recipe.weight_measurement,
            props.preferences.weight,
            props.recipe.grind_weight,
          )}
        />

        <RecipeListItem
          icon={<Notes />}
          title="Notes"
          body={props.recipe.grind_notes}
          uppercaseBody={false}
          bodyUnderTitle={true}
        />
      </View>
    </AccordionWrapper>
  );
}
