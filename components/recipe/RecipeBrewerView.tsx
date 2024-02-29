import React, { ReactNode } from "react";
import { View, Text } from "react-native";
import appStyles from "@/features/shared/styles/styles";
import { brewerImagesBucket } from "@/constants/storage-buckets";
import { Recipe } from "@/types/recipe";
import RecipeListItem from "@/components/recipe/RecipeListItem";
import ImageWrapper from "@/features/shared/components/wrappers/ImageWrapper";
import { Notes, CoffeeMachine, FrenchPress } from "@/components/icons";
import { frenchPress } from "@/constants/coffee-brew-methods";
import AccordionWrapper from "@/features/shared/components/wrappers/AccordionWrapper";

type Props = {
  recipe: Recipe;
};

export default function Component(props: Props) {
  function renderIcon(): ReactNode {
    if (props.recipe.brewer_method === frenchPress.label) {
      return <FrenchPress />;
    }
    return <CoffeeMachine />;
  }

  return (
    <AccordionWrapper title="Brewer" disabled={false}>
      <View style={appStyles.accordionContent}>
        <ImageWrapper
          imageBucket={brewerImagesBucket}
          imageUrl={props.recipe.brewer_image}
        />

        <Text style={appStyles.headerText}>{props.recipe.brewer_name}</Text>

        <RecipeListItem
          icon={renderIcon()}
          title="Method"
          body={props.recipe.brewer_method}
        />

        <RecipeListItem
          icon={<Notes />}
          title="Notes"
          body={props.recipe.brewer_notes}
          uppercaseBody={false}
          bodyUnderTitle={true}
        />
      </View>
    </AccordionWrapper>
  );
}
