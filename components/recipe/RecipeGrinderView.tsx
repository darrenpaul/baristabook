import React from "react";
import { View, Text } from "react-native";
import appStyles from "@/features/shared/styles/styles";
import { Recipe } from "@/types/recipe";
import RecipeListItem from "@/components/recipe/RecipeListItem";
import { Notes } from "@/components/icons";
import AccordionWrapper from "@/features/shared/components/wrappers/AccordionWrapper";

type Props = {
  recipe: Recipe;
};

export default function Component(props: Props) {
  return (
    <AccordionWrapper title="Grinder" disabled={false}>
      <View style={appStyles.accordionContent}>
        <Text style={appStyles.headerText}>{props.recipe.grinder_name}</Text>

        <RecipeListItem
          icon={<Notes />}
          title="Notes"
          body={props.recipe.grinder_notes}
          uppercaseBody={false}
          bodyUnderTitle={true}
        />
      </View>
    </AccordionWrapper>
  );
}
